const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'test-client',
  brokers: ['broker1:9092', 'broker2:9092']  // Reemplaza con tus brokers de MSK
});

const producer = kafka.producer();

async function sendMessages(batchSize: number) {
  await producer.connect();
  const messages = Array.from({ length: batchSize }, (_, i) => ({
    value: JSON.stringify({
      data: {
        payload: {
          "userName": "c41311ec-58de-48eb-8146-3da5146c8e7e",
          "user": {
            "lastName": "SILVA BOCANGEL",
            "address": "URB. LOS MARQUESES MZ. C LT. 6",
            "gender": "male",
            "province": "CUSCO",
            "documentNumber": "1234560" + i.toString(),
            "dob": "1996-07-13T00:00:00Z",
            "district": "CUSCO",
            "name": "JEAN MARCO",
            "state": "CUSCO"
          }
        },
        snapshot: {
          "cognitoUser": {
            "emailVerified": "false",
            "sub": "7eadd3d3-8150-4b07-bf61-6f5da0fdab24",
            "cognitoUserStatus": "CONFIRMED",
            "phone": "+51974924655",
            "name": null,
            "phoneNumberVerified": "true",
            "userName": "c41311ec-58de-48eb-8146-3da5146c8e7e",
            "userPoolId": "us-east-1_61c3QUZqb",
            "dni": "72533574",
            "email": "jeanmarco.silva.matrix@gmail.com"
          },
          "document": {
            "uploadIntent": {
              "backside": "on-boarding/c41311ec-58de-48eb-8146-3da5146c8e7e/document/1/backside.png",
              "id": 1,
              "time": 1675359328458,
              "frontside": "on-boarding/c41311ec-58de-48eb-8146-3da5146c8e7e/document/1/frontside.png"
            },
            "validationIntent": {
              "code": "VLD2a8435f160be38d0bc7d73f25c194467",
              "startedAt": 1675359344894,
              "id": 1,
              "status": "pending"
            }
          },
          "user": {
            "lastName": "SILVA BOCANGEL",
            "address": "URB. LOS MARQUESES MZ. C LT. 6",
            "gender": "male",
            "province": "CUSCO",
            "documentNumber": "1234560" + i.toString(),
            "dob": "1996-07-13T00:00:00Z",
            "district": "CUSCO",
            "name": "JEAN MARCO",
            "state": "CUSCO"
          },
          "status": "ID_VALIDATED"
        },
      },
      author: "TRUORA",
      id: i,
      source: `source-${i}`,
      time: Date.now(),
      dataContentType: "application/json",
      type: "com.gcredicorp.matrix.onboarding.id-validated",
      transaction: `transaction-${i}`,
      dataEncodingType: "identity"
    }),
  }));

  await producer.send({
    topic: 'your-topic-name',  // Reemplaza con el nombre de tu tópico
    messages
  });

  await producer.disconnect();
}

sendMessages(6).catch(console.error);
