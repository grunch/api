'use strict'
const cron = require('node-cron')
const chalk = require('chalk')
const coinValue = require('../services/index')
const HistoricCoinModel = require('../api/src/models/historic-coin.model')
const momentTimeZone = require('moment-timezone')
const workingEveryhour = async () => {
    try {
        let m1 = momentTimeZone().tz('America/Caracas')
        const coinvalue = await coinValue()
        const historicCoinModel = new HistoricCoinModel()
        historicCoinModel.VEF_BTC = coinvalue.VEF_BTC
        historicCoinModel.USD_BTC = coinvalue.USD_BTC
        historicCoinModel.GBP_BTC = coinvalue.GBP_BTC
        historicCoinModel.EUR_BTC = coinvalue.EUR_BTC
        historicCoinModel.date =  m1.format("YYYY-MM-DD")
        const historicSaveResult = await historicCoinModel.save()
        if (historicSaveResult) {
            console.log(`${chalk.green('[btven-coin-schedule]')} save succesfull historic ${m1}`)
        } else {
            throw Error(`Not save historic coin`)
        }
    } catch (error) {
        throw Error(error)
    } 
}
const SaveDataDB = () => {
    workingEveryhour()
    cron.schedule('* */6 * * *', () => {
        workingEveryhour()
    })
}

module.exports = SaveDataDB