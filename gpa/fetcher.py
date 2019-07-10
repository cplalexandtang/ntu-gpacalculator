from bs4 import BeautifulSoup
import requests
import json

keys = [
	"Group", "Year", "Course", "ClassNum", "ID", "Class", "Credit", "Grade", "Memo", "Last60",
]
letters = [
	"A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F", "X"
]
mapLetter2Gpa = {
	"A+" : 4.3,
	"A" : 4.0,
	"A-" : 3.7,
	"B+" : 3.3,
	"B" : 3.0,
	"B-" : 2.7,
	"C+" : 2.3,
	"C" : 2.0,
	"C-" : 1.7,
	"F" : 0,
	"X" : 0,
}

def myInt(string):
	try:
		num = int(string)
	except:
		if "1" in string:
			num = 3
		else:
			num = 4
	return num

def getGrades(url):
	try: html_doc = requests.get(url).text.encode('latin-1').decode('big5')
	except: return {"status" : "Error"}

	soup = BeautifulSoup(html_doc, 'html.parser')
	res = soup.find_all("tr")
	grades = list()
	major = 0
	name = str()
	for r in res:
		grade = dict()
		_soup = BeautifulSoup(str(r), 'html.parser')

		if str(r).find('學院 / 系組') != -1:
			major_info = str(_soup.find_all("td")[0]).split()
			collegeName, departmentName = major_info[7], major_info[10]
			major = int(major_info[9])

		for idx, t in enumerate(_soup.find_all("td")):
			if idx < (len(keys)-1):
				#print(keys[idx], str(t.string).strip())
				grade.update({keys[idx] : str(t.string).strip()})
		
		grade.update({"Score" : mapLetter2Gpa.get(grade.get("Grade"))})
		grade.update({"Last60" : False}) # initialize
		if grade.get("Grade") in letters : grades.append(grade)

	gpa = 0
	credit = 0
	for grade in grades:
		gpa += (mapLetter2Gpa.get(grade.get("Grade")) * float(grade.get("Credit")))
		credit += float(grade.get("Credit"))
	gpa = float("{0:.2f}".format(gpa/credit))
	grades.sort(key= lambda ele:( myInt(ele.get("Year").split('/')[0]), myInt(ele.get("Year").split('/')[1]) ,mapLetter2Gpa.get(ele.get("Grade"))))
	
	last60Credit = 0
	for grade in reversed(grades):
		if last60Credit >= 60 - int(grade.get("Credit")):
			grade.update({"Last60" : True})
			break
		grade.update({"Last60" : True})
		last60Credit += int(grade.get("Credit"))

	return {
		"status" : "OK",
		"grades" : grades,
		"credit" : credit,
		"gpa" : gpa,
		"major" : major
	}
