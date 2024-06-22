#! /usr/bin/env node

import inquirer from "inquirer";

interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

//  Bank Account class
class BankAccount implements BankAccount{
accountNumber: number;
balance: number;
constructor(accountNumber: number ,balance: number){
    this.accountNumber = accountNumber
    this.balance = balance
}

// Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successsfull. Remaining balacne is: ${this.balance}`);
        
    }else{
        console.log("Insufficient balance");
    }
}
//  Credit money
deposit(amount: number): void {
    if(amount >= 100){
        amount -= 1 // Deduct 1 dollar charge for deposit amount greater than 100 dollar
    }this.balance += amount;
    console.log(`Deposit of $${amount} successfull. Remaining balance is $${this.balance}`);
    
}

// Check Balance
checkBalance(): void {
    console.log(`Your current balance is $${this.balance}`);
    
}
}

// Customer Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstname: string , lastName: string , gender: string , age: number , mobileNumber: number , account: BankAccount)
    {
        this.firstName = firstname;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// Create Bank Account
const accounts: BankAccount[] =[
    new BankAccount (1010 , 700),
    new BankAccount (1011 , 1800),
    new BankAccount (1012 , 2000),
    new BankAccount (1013, 3000),
];

// Create Customers
const customers: Customer[] =[
    new Customer("Bilal" , "Sheikh" , "Male" , 23 , 3081212122 , accounts[0]),
    new Customer("Mustafa" , "Khan" , "Male" , 24 , 3081212123 , accounts[1]),
    new Customer("Abdullah" , "Khan" , "Male" , 22 , 3081212124 , accounts[2]),
    new Customer("Ali" , "Khan" , "Male" , 25 , 3081212125 , accounts[3]),
]

// Function to interact with bank account

async function service(){
    do {
        let accountNumberinput  = await inquirer.prompt({
            name: "accountNumber",
            message: "Enter your account number",
            type: "number"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberinput.accountNumber)
        if(customer){
            console.log(`Welcome ${customer.firstName} ${customer.lastName}`)
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an Operation",
                choices: ["deposit", "withdraw", "checkBalance", "Exit"],
            })
            switch(ans.select){
                case "deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw",
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                        case "checkBalance":
                            customer.account.checkBalance();
                            break;
                    case "Exit":
                        console.log("Exiting Bank system....");
                        console.log("\nThank you for using bank services");
                        return;
                        process.exit()
            }
        }    else{
            console.log("Invalid");
            
        }        
        }while (true);
        }
service(); // To call function