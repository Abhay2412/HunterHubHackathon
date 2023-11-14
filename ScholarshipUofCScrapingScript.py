import requests
from bs4 import BeautifulSoup
import json
import re

def fetch_scholarship_links(list_page_url):
    response = requests.get(list_page_url)
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    
    scholarship_links = soup.select('.award-tile a')
    unique_links = set()
    base_url = "https://ucalgary.ca"

    for link in scholarship_links:
        href = link.get('href')
        if href and not href.startswith('http'):
            full_url = base_url + href
        else:
            full_url = href
        unique_links.add(full_url)

    return list(unique_links)

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

list_page_url = "https://ucalgary.ca/registrar/finances/awards-scholarships-and-bursaries/search-awards"
scholarship_links = fetch_scholarship_links(list_page_url)
all_scholarships = [scrape_scholarship(url) for url in scholarship_links]

# Sort the scholarships alphabetically by title
all_scholarships_sorted = sorted(all_scholarships, key=lambda x: x['title'])

with open('scholarships_data_sorted.json', 'w', encoding='utf-8') as f:
    json.dump(all_scholarships_sorted, f, ensure_ascii=False, indent=4)