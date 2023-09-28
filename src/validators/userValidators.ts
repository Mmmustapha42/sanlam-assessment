import Joi from "joi"

interface UsersLogin {
    username: string
    password: string
}


export const usersValidator = (user: UsersLogin) => {
    const schema = Joi.object({
      username: Joi.string().trim().required().label("username"),
      password: Joi.string().required().label("password")
    });
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };
    return schema.validate(user, options);
  };
