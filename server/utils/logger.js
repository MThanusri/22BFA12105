const axios = require("axios");

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0aGFudXNyaW1lcnV2YTA5QGdtYWlsLmNvbSIsImV4cCI6MTc1Mzc3MDYwNywiaWF0IjoxNzUzNzY5NzA3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTlkM2EwYWItYTY0ZC00NDI2LWFjYzItYzU5OWFmY2I1YzczIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWVydXZhIHRoYW51c3JpIiwic3ViIjoiMDEyMjJjNDItYmZmMS00N2VhLWE4Y2EtNTgyNjBiNzNkMjAzIn0sImVtYWlsIjoidGhhbnVzcmltZXJ1dmEwOUBnbWFpbC5jb20iLCJuYW1lIjoibWVydXZhIHRoYW51c3JpIiwicm9sbE5vIjoiMjJiZmExMjEwNSIsImFjY2Vzc0NvZGUiOiJQcmp5UUYiLCJjbGllbnRJRCI6IjAxMjIyYzQyLWJmZjEtNDdlYS1hOGNhLTU4MjYwYjczZDIwMyIsImNsaWVudFNlY3JldCI6IkVyZnBncW5lcVBqblZueU0ifQ.r5os-aEXobs8pZeE9ij99MauTYdJp5E1C0zyOKpK2Po";

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: pkg,
      message
    }, {
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN.trim()}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Log sent");
  } catch (err) {
    console.error("Log failed:", err.response?.status, err.response?.data || err.message);
  }
};

module.exports = log;
