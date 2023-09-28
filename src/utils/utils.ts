import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export class Utils {    
    static async hashFunction(data:any) {
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(data, salt)
      if (!hash) throw new Error("Error hashing your data, try again")
      console.log(hash)
      return hash
    }

    static async compareHash(newData, savedData) {
      const result = await bcrypt.compare(newData, savedData)
      if (!result) throw new Error( "Password do not match")
      return result
    }

    static async generateToken(data:any): Promise <string>{
      try {
        const secretKey = process.env.SECRET_KEY as string || "secret_key"
        const token = jwt.sign(data, secretKey, {expiresIn: "15m"})
        if (!token) throw new Error("Invalid Token")
        console.log(token)
        return token

      } catch (error) {
        throw error;
      }
     }

     static async decodeToken(data: string) {
      try {
        const secretKey = "secret_key"
        const decodedToken = jwt.verify(data, secretKey);
        if (!decodedToken) throw Error("Unable to decode token")
        return decodedToken
        
      } catch (error) {
        throw new Error(`Error decoding token ${error}`)
      }
     }
}