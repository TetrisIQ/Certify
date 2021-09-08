import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import logger from '../shared/Logger';
import { ParamsDictionary } from 'express-serve-static-core';
import {Report} from "../model/Report";
import ReportService from "../service/ReportService";

// Init shared
const router = Router();

/******************************************************************************
 *                      Get Report by ID - "GET /api/report/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    let project : Report = await ReportService.getReportById(id)

    logger.info("GET BY ID OK ")
    return res.status(StatusCodes.OK).json(project);
});

/******************************************************************************
 *                      Get all Report - "GET /api/report/all"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    let reports : Array<Report> = await ReportService.getAllReports()
    logger.info("GET ALL OK ")
    return res.status(StatusCodes.OK).json(reports);
});


/******************************************************************************
 *                      post create Report - "POST /api/report/"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    let report = await  ReportService.createReport(req.body.hash);
    logger.info("POST create OK ")
    return res.status(StatusCodes.OK).json(report);
});


export default router;
