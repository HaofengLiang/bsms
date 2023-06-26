import service from "./businessService.js";

async function save(req, res) {
  const business = req.body;
  business.owner = req.session.user.sub;

  try {
    const savedBusiness = await service.save(business);
    res.status(201).json(savedBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

export default { save };
