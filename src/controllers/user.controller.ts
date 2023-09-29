import { UserService } from "../services/user.service";
import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AppDataSource } from "../data-source";
import { Users } from "../entities/user.entity";
import PDFDocument from "pdfkit"
import { usersValidator } from "../validators/userValidators";
import { Utils } from "../utils/utils";

export class UserController {
    static async LoginUser(req: Request, res:Response) {
    const { username, password } = req.body;
    const { error, value } = usersValidator({username, password});
    if (error) throw new Error(error.details[0].message)
    
     const user = await UserService.getSingleUser(username)

     const isPasswordValid = await bcrypt.compare(password, user.password);

     if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
     }
     const tokenn = await Utils.generateToken({userId: user.id, passwor: user.password})
     res.status(200).json({ tokenn });
    }

    static async getAssetsAndInvestments(req: Request, res:Response) {
        const userId = req.params.userId
       
    try {

      console.log(userId)
      const userRepository = AppDataSource.getRepository(Users);
      const user = await userRepository.findOne({
        where: { id: userId }
      });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.products);
    } catch (error) {
    console.error('Error retrieving user products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };

  static async paymentTransactions(req: Request, res:Response) {
    const userId = req.params.userId

    try {
    const user = await UserService.getSingleUserById(userId)
    const { amount_paid, date_of_payment } = user;
    res.status(200).json({ amount_paid, date_of_payment });
    
    } catch (error) {
   console.error('Error retrieving user products:', error);
   res.status(500).json({ message: 'Internal server error' });
   }  
  };

  static async DownloadDetailsofPayment(req: Request, res:Response) {
    const userId = req.params.userId
    try {
    const user = await UserService.getSingleUserById(userId)
    const pdfDoc = new PDFDocument();
    const pdfFileName = `payment_details_${user.id}.pdf`;
    // Set response headers to indicate a PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${pdfFileName}"`);
    pdfDoc.pipe(res)
    pdfDoc
      .fontSize(18)
      .text('Payment Details', { align: 'center' })
      .fontSize(14)
      .text(`User: ${user.customer_name}`)
      .text(`Amount Paid: ${user.amount_paid}`)
      .text(`Date of Payment: ${user.date_of_payment}`);
    pdfDoc.end();
    res.send("succesfully downloaded")
    } catch (error) {
   console.error('Error Downloading document:', error);
   res.status(500).json({ message: 'Internal server error' });
   }  
  };

}