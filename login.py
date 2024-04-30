import tkinter as tk

def on_username_focus(event):
    if username_entry.get() == "Username":
        username_entry.delete(0, tk.END)
        username_entry.config(fg="black")  

def on_password_focus(event):
    if password_entry.get() == "Password":
        password_entry.delete(0, tk.END)
        password_entry.config(fg="black")  
def on_username_leave(event):
    if not username_entry.get():
        username_entry.insert(0, "Username")
        username_entry.config(fg="gray") 

def on_password_leave(event):
    if not password_entry.get():
        password_entry.insert(0, "Password")
        password_entry.config(fg="gray")  

def login():
    username = username_entry.get()
    password = password_entry.get()
    print("Username:", username)
    print("Password:", password)

root = tk.Tk()
root.title("Login")

root.configure(bg="white")
root.geometry("400x400")

logo_label = tk.Label(root, text="MyDocs", font=("Helvetica", 24, "bold"), bg="white", fg="#F89E1B")
logo_label.pack(pady=(20, 10))

username_entry = tk.Entry(root, width=30, font=("Helvetica", 12), fg="gray")
username_entry.insert(0, "Username")
username_entry.bind("<FocusIn>", on_username_focus)
username_entry.bind("<FocusOut>", on_username_leave)
username_entry.pack(pady=(10, 5))

password_entry = tk.Entry(root, width=30, font=("Helvetica", 12), show="*", fg="gray")
password_entry.insert(0, "Password")
password_entry.bind("<FocusIn>", on_password_focus)
password_entry.bind("<FocusOut>", on_password_leave)
password_entry.pack(pady=(0, 10))

check_var = tk.IntVar()
check_button = tk.Checkbutton(root, text="Verify you are human", variable=check_var, bg="white")
check_button.pack()

login_button = tk.Button(root, text="Login", command=login, font=("Helvetica", 12), bg="#F89E1B", fg="white", width=15)
login_button.pack(pady=(20, 10))

forgot_label = tk.Label(root, text="Forgot Password?", font=("Helvetica", 10), bg="white", fg="#0056b3")
forgot_label.pack()

root.mainloop()
