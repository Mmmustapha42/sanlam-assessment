import { AppDataSource } from "../data-source";
import { Users } from "../entities/user.entity";

export class UserService {
        static async createUsers(details:Users): Promise<Users> {
            const transRepository = AppDataSource.getRepository(Users);
            const users = transRepository.create(details)
            if (!users) throw new Error("user could not be created");
            await transRepository.save(users);
            return users;
        }

       static async getSingleUser(username: string) {
        try {  
            const userRepository = AppDataSource.getRepository(Users);
            const user = await userRepository.findOne({ where: { username} });
            if (!user) {
              throw Error('User does not exist')
             }
             return user;
          } catch (error) {
            throw new Error("Error fetching user");
          }
       } 

       static async getSingleUserById(id: string) {
        try {  
            const userRepository = AppDataSource.getRepository(Users);
            const user = await userRepository.findOne({ where: { id} });
            if (!user) {
              throw Error('User does not exist')
             }
             return user;
          } catch (error) {
            throw new Error("Error fetching user");
          }
       } 
  
}