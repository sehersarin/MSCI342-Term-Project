import java.util.ArrayList;
 import java.util.Scanner;


 public class signup {

        public static void  main(String[] args) {
           
           //Create arrays to store the credentials provided by the user 
        //Array for users who are students
        ArrayList<userType> users = new ArrayList<userType>(); 
        //Array for users who are serviceStaff
        ArrayList<userType> serviceStaff = new ArrayList<userType>(); 
            
            //Create a scanner to injest the credentials which the user inputs

            Scanner input = new Scanner(System.in); 

            String email, password, schoolName;

            //The main account creation page
            
            System.out.println("<<WELCOME TO THE ACCOUNT CREATION PAGE>>");
            
            /*There are different sign up experiences for students and service staff. 
            The following asks the user to specify if they are a student or a service staff*/

            System.out.println("Are you a student (type '1') or a service staff (type '2')?:  ");
            int userTypeSelection = input.nextInt();

/* Based on the above input, the system executes either case 1 for a student user 
or case 2 for a service staff user*/


            /* In case 1, The system asks the student users to input their credentials 
            which are their 
            firstName
            lastName
            email
            password
            phone
            schoolID.*/

switch (userTypeSelection) {
case 1:
    System.out.println("<<Student Sign Up>>");

    System.out.print("firstName : "); 
    email = input.next();

    System.out.print("lastName : "); 
    email = input.next();

    System.out.print("email : "); 
    email = input.next();

    System.out.print("password : "); 
    email = input.next();
    
    System.out.print("phone : "); 
    email = input.next();

    System.out.print("schoolID : ");
    password = input.next();


    //We make an account for the student based on the credentials they provided:
    student.add(new userType(firstName, lastName, email, password, phone, schoolID));
    break;


 /* In case 2, The system asks the service staff users to input their credentials 
            which are their 
            workerID
            firstName
            lastName
            email
            password
            phone
            specialization.*/
case 2:
    System.out.println("<<Service Staff Sign Up >>");

    System.out.print("workerID : "); 
    email = input.next();

    System.out.print("firstName : "); 
    email = input.next();

    System.out.print("lastName : "); 
    email = input.next();

    System.out.print("email : "); 
    email = input.next();

    System.out.print("password : "); 
    email = input.next();
    
    System.out.print("phone : "); 
    email = input.next();

    System.out.print("specialization : ");
    password = input.next();

    //We make an account for the service staff based on the credentials they provided:
    serviceStaff.add(new userType(workerID, firstName, lastName, email, password, phone, specialization));
    break;

    //If neither case 1 or case 2 is executed, we default to requesting the user to make a selection:
default:
    System.out.println("Please specify if you are a student (type '1') or a service staff (type '2')");
}