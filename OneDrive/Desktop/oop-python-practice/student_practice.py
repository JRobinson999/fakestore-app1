import re

class Student:
    def __init__(self, name, email, grades):
        self.name = name
        self.email = email
        self.grades = grades

    def add_grade(self, grade):
        self.grades.append(grade)

    def average_grade(self):
        return sum(self.grades) / len(self.grades)

    def display_info(self):
        print(f"Name: {self.name}")
        print(f"Email: {self.email}")
        print(f"Grades: {self.grades}")

    def grades_tuple(self):
        return tuple(self.grades)

    def validate_email(self):
        pattern = r"^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$"
        return re.match(pattern, self.email) is not None


student1 = Student("Avery", "avery@email.com", [82, 90, 76])
student2 = Student("Jordan", "jordan@email.com", [88, 91, 79])
student3 = Student("Chris", "chris@email.com", [95, 84, 93])

students = [student1, student2, student3]

for student in students:
    student.add_grade(100)
    student.add_grade(87)

for student in students:
    student.display_info()
    print(f"Average Grade: {student.average_grade():.2f}")
    print(f"Valid Email: {student.validate_email()}")
    print()

student_dict = {
    student.email: student for student in students
}

def get_student_by_email(email):
    return student_dict.get(email)

found_student = get_student_by_email("avery@email.com")

if found_student:
    print("Student found:")
    found_student.display_info()
else:
    print("Student not found.")

unique_grades = set()

for student in students:
    unique_grades.update(student.grades)

print(f"Unique Grades: {unique_grades}")

grades_as_tuple = student1.grades_tuple()
print(f"Grades as tuple: {grades_as_tuple}")

try:
    grades_as_tuple[0] = 100
except TypeError:
    print("Tuples are immutable, so they cannot be changed.")

for student in students:
    removed_grade = student.grades.pop()
    print(f"Removed last grade for {student.name}: {removed_grade}")

    print(f"{student.name}'s first grade: {student.grades[0]}")
    print(f"{student.name}'s last grade: {student.grades[-1]}")
    print(f"{student.name} has {len(student.grades)} grades.")
    print()

grades_above_90 = 0

for student in students:
    for grade in student.grades:
        if grade > 90:
            grades_above_90 += 1

print(f"Number of grades above 90: {grades_above_90}")