import tkinter as tk
import subprocess


def role_selected(role):
    if role=='Student':
        subprocess.run(['python','login.py'])
    else:
        print(role)


def select_student():
    role_selected("Student")


def select_staff():
    role_selected("Staff")


root = tk.Tk()
root.title("MyDocs")
frame = tk.Frame(root)
frame.pack(side="top", expand=True)
tk.Label(frame, text="Welcome to MyDocs !", font=("Comic Sans MS", 50, "italic")).grid(
    row=0, column=0, columnspan=2
)
tk.Label(frame, text="Choose your role ?", font=("Helvetica", 35)).grid(
    row=1, column=0, columnspan=2, pady=(50, 0)
)
student_frame = tk.Frame(frame)
student_frame.grid(row=2, column=0, padx=20, pady=(50, 0))
staff_frame = tk.Frame(frame)
staff_frame.grid(row=2, column=1, padx=20, pady=(50, 0))
student_img = tk.PhotoImage(
    file="D:/StudyMaterial/SEM4/DBMS-LAB/PROJECT/Document_Management_System/fotor-20240426224748-modified.png"
)
# tk.Label(student_frame, image=student_img).pack()
student_button = tk.Button(
    student_frame,
    image=student_img,
    text="Student",
    compound="top",
    command=select_student,
    font=("Helvetica", 30),
)
student_button.config(height=450, width=450)
student_button.pack()
staff_img = tk.PhotoImage(
    file="D:/StudyMaterial/SEM4/DBMS-LAB/PROJECT/Document_Management_System/fotor-20240426224748-modified.png"
)
# tk.Label(staff_frame, image=staff_img).pack()
staff_button = tk.Button(
    staff_frame,
    image=staff_img,
    text="Staff",
    compound="top",
    command=select_staff,
    font=("Helvetica", 30),
)
staff_button.config(height=450, width=450)
staff_button.pack()
root.mainloop()
