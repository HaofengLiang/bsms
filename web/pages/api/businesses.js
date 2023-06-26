export default function handler(req, res) {
  res.status(200).json([
    { name: "Business 1", description: "This is the first business" },
    { name: "Business 2", description: "This is the second business" },
    { name: "Business 3", description: "This is the third business" },
    { name: "Business 4", description: "This is the fourth business" },
  ]);
}
