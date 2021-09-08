import {getRepository} from "fireorm";
import {User} from "../model/User";

class UserService {
    private userRepo = getRepository(User);


    async getUserById(id: string) {
        return await this.userRepo.findById(id).then(result => {
            return result;
        });
    }

    async getUsersByIds(ids: Array<User>) {
        let users: Array<User> = [];
        for (let u of ids) {
            let user = await this.userRepo.findById(u.id).then(result => result);
            users.push(user);
        }
        return users;
    }
}

export default new UserService();