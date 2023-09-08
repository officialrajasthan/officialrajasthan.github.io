# Download all Order and Meta Information Form Finance Department Rajasthan

import time

import Constants
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get(Constants.FDR_URL)

time.sleep(5)

driver.find_element(By.ID, "ContentPlaceHolder1_btnsearch").click()
time.sleep(30)

table_id = driver.find_element(By.ID, "ContentPlaceHolder1_gdv1")
rows = table_id.find_elements(By.TAG_NAME, "tr")

with open("fdOrder.csv", "a") as f:
    for row in rows:
        lst = []
        for c in row.find_elements(By.TAG_NAME, "td"):
            lst.append(c.text)
        for c in row.find_elements(By.TAG_NAME, "a"):
            lst.append(c.get_attribute("href"))

        f.write(", ".join(lst) + "\n")
    f.close()


driver.quit()
