# lab01_methodology

# Quadratic Equation Solver

## Description

This is a console application that solves quadratic equations. It includes two modes:

- not interactive;
- interactive;

In non-interactive mode, data is read from the file specified by the user.
In interactive mode, the user enters the data himself, the application accepts them and solves the quadratic equation.

## How to use

### To start in interactive mode:

---

## $ node index.js

### Interactive mode output example:

---

a = 1
b = -5
c = 6
Equation is: (1.0)x^2 + (-5.0)x + (6.0) = 0
There are 2 roots
x1 = 2.0
x2 = 3.0

---

Input a: 1
Input b: -4
Input c: 4
Equation is: (1.0) x^2 + (-4.0) x + (4.0) = 0
There are 1 roots
x1 = 2.0

---

## If incorrect data is entered, the program will ask you to enter correct data:

Input a: qwerty
Error. Expected a valid real number, got qwerty instead
Input a: 2
Input b: ?
Error. Expected a valid real number, got ? instead
Input b: 4
Input c: 6six
Error. Expected a valid real number, got 6six instead
Input c: 7
Equation is: (2.0) x^2 + (4.0) x + (7.0) = 0
There are 0 roots

---

## If a = 0, the application shows an error

Input a: 0
Error. a cannot be 0

---

### To start non-interactive mode:

---

## $ node index.js /pathToFile

### Non-interactive mode output example:

## File parametr.txt: 1 -5 6

Equation is: (1.0)x^2 + (-5.0)x + (6.0) = 0
There are 2 roots
x1 = 3.0
x2 = 2.0

---

## If a = 0, the application shows an error

node index.js ./parametr.txt
Error. a cannot be 0

---

## If incorrect data is entered in the file, an error will be displayed

node index.js ./parametr.txt
invalid file format

---

# Link on Revert Commit

[Revert commit]()
