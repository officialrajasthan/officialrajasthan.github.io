import requests
from bs4 import BeautifulSoup


URL = "https://finance.rajasthan.gov.in/website/SearchOrders.aspx"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")
print(soup.prettify())
