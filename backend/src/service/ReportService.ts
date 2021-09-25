import logger from "../shared/Logger";
import {getRepository} from "fireorm";
import UserService from "./UserService";
import {Report} from "../model/Report";
import {error} from "winston";
import {response} from "express";

class ReportService {

    private reportRepo = getRepository(Report);
    private userService = UserService;

    async getReportById(id: string) {
        return await this.reportRepo.findById(id).then(result => {
            let report: Report = result;
            return result;
        }).catch(error => {
            logger.error(error)
            return error;
        });

    }

    async getAllReports() {
        return await this.reportRepo.find().then(result => {
            logger.info(JSON.stringify(result));
            logger.info("NASE")
            return result;
        })
            .catch(error => {
                logger.info("ERROR NASE")
                return error
            });

    }

    async createReport(hash: string) {
        return await this.reportRepo.create(new Report().setHash(hash)).then(result => result);
    }
}


export default new ReportService();