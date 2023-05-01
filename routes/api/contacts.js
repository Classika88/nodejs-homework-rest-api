const express = require("express");

const ctrl = require("../../controllers/contacts");

const {schemas} = require("../../models/contact");

const router = express.Router();

const {validateBody, isValidId, authenticate} = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoritesSchema), ctrl.updateFavorites);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);


module.exports = router;
