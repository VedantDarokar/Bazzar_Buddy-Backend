import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getSupplierProducts, addSupplierProduct,updateSupplierProduct,deleteSupplierProduct} from "../Controllers/supplierProductController.js";

router.get("/", authMiddleware, getSupplierProducts);
router.post("/", authMiddleware, addSupplierProduct);
router.put("/:id", authMiddleware, updateSupplierProduct);
router.delete("/:id", authMiddleware, deleteSupplierProduct);

export default router;