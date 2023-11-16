from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import json
import time
import requests

url = 'https://www.ucalgary.ca/future-students/undergraduate/explore-programs'

# Set up the Selenium WebDriver
options = Options()
options.headless = True  # Run in headless mode, without opening a browser window
driver = webdriver.Chrome(options=options)

driver.get(url)
time.sleep(11)

page_source = driver.page_source
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find the main container div
    container_div = soup.find('div', class_='search-results__items')

    if container_div:
        # Find all the items within the container
        items = container_div.find_all('div', class_='search-results__item')

        with open('uofc_majors.jsonl', 'w', encoding='utf-8') as jsonl_file:
            for item in items:
                # Go one level deeper
                inner_div = item.find('div', class_='search-results__item__inner')

                if inner_div:
                    # Go one more level deeper to get the summary
                    summary_div = inner_div.find('a', class_='search-results__item__link')

                    if summary_div:
                        # Extract and print the content of the summary
                        summary_content = summary_div.text.strip()
                        jsonl_file.write(json.dumps({'Major': summary_content}, ensure_ascii=False) + '\n')
                        print(summary_content)
                    else:
                        print("No summary found in this item.")
                else:
                    print("No inner div found in this item.")
    else:
        print("No container div found.")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")

driver.quit()