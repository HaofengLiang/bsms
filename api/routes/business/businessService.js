import db from "../../persistence/index.js";

const model = db.models.business;

export async function save(business) {
  delete business.createdAt;
  delete business.updatedAt;

  if (business.id) {
    const updatedBusiness = await model.update(business, {
      where: { id: business.id, owner: business.owner },
      returning: true,
    });
    return updatedBusiness[1][0];
  } else {
    const savedBusiness = await model.create(business);
    return savedBusiness;
  }
}

const service = { save };
export default service;
