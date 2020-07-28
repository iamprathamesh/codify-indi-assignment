const Counter = require('../models/counter');
const GlobalException = require('../exceptions/globalexception');

class CounterService {

    constructor() { }

    static findByIdAndUpdate(counterId) {
        return new Promise((resolve, reject) => {
            Counter.findByIdAndUpdate({
                _id: counterId
            },  {
                $inc: { sequence_value: 1 }
            }, {
                new: true,
                useFindAndModify: false
            }, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = CounterService;