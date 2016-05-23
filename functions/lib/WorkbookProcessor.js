import xlsx from 'xlsx';

import request from 'request-promise';

import { WorkbookParser } from './WorkbookParser';

class WorkbookProcessor {

  constructor(url) {
    this.url = url;
  }

  process() {
    return request.get(this.url, {encoding: null})
            .then((buffer) => {
              const workbook = WorkbookParser.workbook(buffer)
              const parser = new WorkbookParser(workbook);
              return parser.parse();
            });
  }


}


export { WorkbookProcessor }

// return new Promise( (resolve, reject) => {
//   console.log('Promise');
//   request(this.url, {encoding: null})
//     .then((buffer) => {
//       console.log(buffer);
//       const workbook = WorkbookParser.workbook(buffer)
//       const parser = new WorkbookParser(workbook);
//       const data = parser.parse();
//       console.log(data);
//       resolve(data);
//     })
//     .catch(function (err) {
//       console.log(err);
//       reject(err);
//     });
// });
