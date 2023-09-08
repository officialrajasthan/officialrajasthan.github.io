import sqlite3

conn = sqlite3.connect('officialrajasthan')

print("Opened database successfully");


cursor = conn.execute("SELECT * from Orders")


for row in cursor:
   print ("ID = ", row[0])
   print ("NAME = ", row[1])
   print ("ADDRESS = ", row[2])
   print ("SALARY = ", row[3], "\n")



conn.close()

def InsertOrder(orderItem):
   query="INSERT INTO COMPANY (id,uoid,departmentId,adepartmentId,details,date,remarks,tags,related,url,lastupdate) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 )"
   conn.execute(query)
   conn.commit()
