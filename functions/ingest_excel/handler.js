{
  "Records": [
    {
      "s3": {
        "object": {
          "key": "file.xls"
        },
        "bucket": {
          "name": "bucket"
        }
      }
  ]
}



export default (event, context) => {

  const s3 = event.Records[0].s3

  // parse();
  console.log(s3.bucket.name);
  console.log(s3.object.key);

  // event.Records

  return {
    event: event,
    context: context
  }
}
