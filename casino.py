import sqlite3, random, hashlib

def md5sum(value):
    return hashlib.md5(value.encode()).hexdigest()

def registration():
    name = input("Name: ")
    age = int(input("Age: "))
    gender = int(input("Gender: "))
    login = input("Login: ")
    password = input("Password: ")
    try:
        db = sqlite3.connect("database.db")
        cursor = db.cursor()
        cursor.execute("SELECT login FROM users WHERE login = ?", [login])
        if cursor.fetchone() is None:
            values = [name, age, gender, login, password]
            cursor.execute("INSERT INTO users(name, age, gender, login, password) VALUES(?, ?, ?, ?, ?)", values)
            db.commit()
        else:
            print("Такой логин уже существует!")
            registration()
    except sqlite3.Error as e:
        print("Error", e)
    finally:
        cursor.close()
        db.close()

def log_in():
    login = input("Login: ")
    password = input("Password: ")
    try:
        db = sqlite3.connect("database.db")
        cursor = db.cursor()
        db.create_function("md5", 1, md5sum)
        cursor.execute("SELECT login FROM users WHERE login = ?", [login])
        if cursor.fetchone() is None:
            print("Такого логина не существует")
        else:
            cursor.execute("SELECT password FROM users WHERE login =? AND password = md5(?)", [login, password])
            if cursor.fetchone() is None:
                print("Пароль неверный")
            else:
                play_casino(login)
    except sqlite3.Error as e:
        print("Error", e)
    finally:
        cursor.close()
        db.close()

def play_casino(login):
    print("\n CASINO <3 <3")
    try:
        db = sqlite3.connect("database.db")
        cursor = db.cursor()
        cursor.execute("SELECT age FROM users WHERE login =? AND age >= ?", [login, 18])
        if cursor.fetchone() is None:
            print("Вам недостаточно лет!")
        else:
            bet = int(input("Bet: "))
            number = random.randint(1, 100)
            balance = cursor.execute("SELECT balance FROM users WHERE login = ?", [login]).fetchone()[0]
            if balance < bet:
                print("Недостаточно средств, нужно больше золота!")
            elif balance <=0:
                print("Недостаточно средств, нужно больше золота!")
            else:
                if number < 50:
                    cursor.execute("UPDATE users SET balance = balance - ? WHERE login = ?", [bet, login])
                    cursor.execute("UPDATE casino SET balance = balance + ?", [bet])
                    print("Ты проиграл :(")
                else:
                    cursor.execute("UPDATE users SET balance = balance + ? WHERE login = ?", [bet, login])
                    cursor.execute("UPDATE casino SET balance = balance - ?", [bet])
                    print("ура победа!")
    except sqlite3.Error as e:
        print("Error", e)
    finally:
        cursor.close()
        db.close()

registration()
log_in()
