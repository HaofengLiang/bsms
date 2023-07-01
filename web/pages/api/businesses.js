// API Route for businesses
// get: Return all businesses
// post: Create a new business
import http from "@/utils/http";

function getAllBusinesses() {
  return [
    { name: "Business 1", description: "This is the first business" },
    { name: "Business 2", description: "This is the second business" },
    { name: "Business 3", description: "This is the third business" },
    { name: "Business 4", description: "This is the fourth business" },
  ];
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("posting to business in the server");
      const business = await http.post("localhost:8080/business", req.body);
      res.status(201).json(business);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Internal service error: Check logs from the server to identify reasons.",
      });
    }
  } else if (req.method === "GET") {
    return res.status(200).json(getAllBusinesses());
  }
}
