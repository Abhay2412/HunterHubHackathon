import requests
from bs4 import BeautifulSoup
import json
import re
import csv


def fetch_scholarship_links(list_page_url):
    response = requests.get(list_page_url)
    if response.status_code != 200:
        return set()

    soup = BeautifulSoup(response.content, 'html.parser')
    scholarship_links = soup.select('.award-tile a')
    unique_links = set()
    base_url = "https://ucalgary.ca"

    for link in scholarship_links:
        href = link.get('href')
        full_url = base_url + href if href and not href.startswith('http') else href
        unique_links.add(full_url)

    return unique_links


def fetch_all_scholarship_links(base_url, max_pages):
    all_links = set()
    for i in range(max_pages):
        page_url = f'{base_url}?page={i}'
        all_links.update(fetch_scholarship_links(page_url))
    return all_links


def safe_get_text(element):
    return element.get_text(strip=True) if element else "N/A"


def extract_int(text):
    return int(re.findall(r'\d+', text.replace(',', ''))[0]) if text and re.search(r'\d+', text) else 0


def year_label_to_int(year_label):
    year_match = re.search(r'(\d+)(?:st|nd|rd|th)', year_label)
    return int(year_match.group(1)) if year_match else 0


def scrape_scholarship(url):
    response = requests.get(url)
    if response.status_code != 200:
        return {}

    soup = BeautifulSoup(response.content, 'html.parser')

    scholarship = {
        "title": safe_get_text(soup.find('h2')),
        "award_value": extract_int(soup.find('div', class_='award-value').p.text),
        "number_of_awards": extract_int(soup.find('div', class_='award-number').p.text),
        "competition_to_apply": safe_get_text(soup.find('div', class_='award-deadline').p),
        "donor": safe_get_text(soup.find('div', class_='donor').p),
        "award_description": [safe_get_text(li) for li in soup.find('div', class_='award-description').find_all('li')],
        "required_criteria": {},
        "year_entering": [],
        "award_information": {}
    }

    criteria_div = soup.find('div', class_='award-criteria')
    if criteria_div:
        for p in criteria_div.find_all('p'):
            strong_text = safe_get_text(p.find('strong')).strip(':')
            if 'Year entering' in strong_text:
                year_labels = [span.text for span in p.find_all('span') if span.text != 'Year entering:']
                scholarship['year_entering'] = [year_label_to_int(label) for label in year_labels]
            else:
                span_text = safe_get_text(p.find('span'))
                scholarship['required_criteria'][strong_text] = span_text

    award_info_div = soup.find('div', class_='award-information')
    if award_info_div:
        for p in award_info_div.find_all('p'):
            strong_text = safe_get_text(p.find('strong')).strip(':')
            span_text = safe_get_text(p.find('span'))
            scholarship['award_information'][strong_text] = span_text

    return scholarship


def convert_to_csv(all_scholarships):
    csv_columns = ["title", "award_value", "number_of_awards", "competition_to_apply", "donor", "award_description", "required_criteria", "year_entering", "award_information"]
    
    with open('scholarships_data.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        writer.writeheader()
        for scholarship in all_scholarships:
            # Convert lists and dicts to strings for CSV
            scholarship['award_description'] = '; '.join(scholarship['award_description'])
            scholarship['required_criteria'] = json.dumps(scholarship['required_criteria'])
            scholarship['year_entering'] = ', '.join(map(str, scholarship['year_entering']))
            scholarship['award_information'] = json.dumps(scholarship['award_information'])
            writer.writerow(scholarship)

# Base URL of the website where scholarships are listed
base_url = "https://ucalgary.ca/registrar/finances/awards-scholarships-and-bursaries/search-awards"

max_pages = 30  
scholarship_links = fetch_all_scholarship_links(base_url, max_pages)

all_scholarships = [scrape_scholarship(url) for url in scholarship_links]
all_scholarships_sorted = sorted(all_scholarships, key=lambda x: x['title'])

# Write to JSON file
with open('scholarships_data_sorted.json', 'w', encoding='utf-8') as f:
    json.dump(all_scholarships_sorted, f, ensure_ascii=False, indent=4)

# Write to CSV file
convert_to_csv(all_scholarships_sorted)