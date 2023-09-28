import { Router, Request, Response } from "express";
import { UserController } from "./controllers/user.controller";
import { UserMiddlewares } from "./middlewares/middlewares";
import { AppDataSource } from "./data-source";
import { Users } from "./entities/user.entity";
import { Utils } from "./utils/utils";

const router = Router();

router.post("/login", UserController.LoginUser)
router.get("/:userId/Assets-and-investments",UserMiddlewares.VerifyToken, UserController.getAssetsAndInvestments)
router.get("/:userId/payment-info",  UserController.paymentTransactions)
router.get("/:userId/download-pdf", UserController.DownloadDetailsofPayment)



router.post('/register', async (req: Request, res: Response) => {
      const { customer_name, date_of_payment, telephone_number, products, amount_paid, date_of_birth, username, password} = req.body;
    
      // Check if user with the same phone exists
     const userRepository = AppDataSource.getRepository(Users);
     const existingEmail = await userRepository.findOne({ where: { telephone_number } });
    
     if (existingEmail) {
       return res.status(400).json({ message: 'User already exists' });
     }
    
     // Hash the password
      const hashP = await Utils.hashFunction(password)
    
     // Create and save the user
      const newUser = new Users();
      newUser.amount_paid = amount_paid,
      newUser.customer_name = customer_name,
      newUser.password = hashP,
      newUser.date_of_birth = date_of_birth,
      newUser.date_of_payment = date_of_payment,
      newUser.telephone_number = telephone_number,
      newUser.products = products,
      newUser.username = username
      await userRepository.save(newUser);
      return res.status(201).json({ message: 'User registered successfully' });
    });
  

export default router