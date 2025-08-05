import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/UserModel.js";
import dotenv from "dotenv";
import CustomerModel from "./models/CustomerModel.js";
import SupplierModel from "./models/SupplierModel.js";
import CategoryModel from "./models/CategoryModel.js";
import BranchModel from "./models/BranchModel.js";
import SystemModel from "./models/SystemModel.js";
import multer from "multer";
import fs from "fs";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/assets', express.static('assets'))

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster`);
app.listen(process.env.PORT, () => console.log(`server is connected to port ${process.env.PORT}`));

// File Upload Handler
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    return cb(null, "./assets")
  },
  filename: (request, file, cb) => {
    return cb(null, file.originalname)
  }
});
const upload = multer({storage});

// Login
app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({email: email});
    if (!user) {
      response.status(404).json({msg: "Couldn't find the email"});
    } else if (user.password !== password) {
      response.status(404).json({msg: "Incorrect password"});
    } else {
      // update lastLogin without changing timestamps
      await UserModel.findByIdAndUpdate(
        user._id, 
        { lastLogin: new Date() },
        { timestamps: false }
      );
      response.send({email: user, msg: "Logged in successfully"});
    }
  }
  catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Logout
app.post("/logout", async (request, response) => {
  response.send({msg: "Logged out successfully"});
});

// Get Users
app.get("/getUsers", async (request, response) => {
  try {
    const userList = await UserModel.find();
    response.send({userList: userList});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Add users
app.post("/addUser", async (request, response) => {
  try {
    const { username, email, password, permissions } = request.body;
    const user = await UserModel.findOne({email: email});
    if (user) {
      response.status(409).json({msg: "Email used already exists"});
    } else {
      const addUser = UserModel({username, email, password, permissions});
      await addUser.save();
      response.send({msg: "User added successfully", addUser});
    }
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
})

// Delete User
app.delete("/deleteUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    await UserModel.findByIdAndDelete(userId);
    response.send({msg: "User deleted successfully"});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Edit User
app.put("/editUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const {username, password, permissions} = request.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, password, permissions },
      { new: true }
    );
    response.send({msg: "User updated successfully", updatedUser});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Add Customer
app.post("/addCustomer", async (request, response) => {
  try {
    const { name, email, mobile } = request.body;
    const customer = await CustomerModel.findOne({name: name});
    if (customer) {
      response.status(409).json({msg: "Customer already exists"});
    } else {
      const addCustomer = CustomerModel({name, email, mobile});
      await addCustomer.save();
      response.send({msg: "Customer added successfully", addCustomer});
    }
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Get Customers
app.get("/getCustomers", async (request, response) => {
  try {
    const customerList = await CustomerModel.find();
    response.send({customerList: customerList});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Delete Customer
app.delete("/deleteCustomer/:id", async (request, response) => {
  try {
    const customerId = request.params.id;
    await CustomerModel.findByIdAndDelete(customerId);
    response.send({msg: "Customer deleted successfully"});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Edit Customer
app.put("/editCustomer/:id", async (request, response) => {
  try {
    const customerId = request.params.id;
    const {name, mobile} = request.body;
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      customerId,
      { name, mobile },
      { new: true }
    );
    response.send({msg: "Customer updated successfully", updatedCustomer});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Add Supplier
app.post("/addSupplier", async (request, response) => {
  try {
    const { name, email, mobile, fax, address, tax } = request.body;
    const supplier = await SupplierModel.findOne({name: name});
    if (supplier) {
      response.status(409).json({msg: "Supplier already exists"});
    } else {
      const addSupplier = SupplierModel({name, email, mobile, fax, address, tax});
      await addSupplier.save();
      response.send({msg: "Supplier added successfully", addSupplier});
    }
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Get Suppliers
app.get("/getSuppliers", async (request, response) => {
  try {
    const supplierList = await SupplierModel.find();
    response.send({supplierList: supplierList});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Edit Supplier
app.put("/editSupplier/:id", async (request, response) => {
  try {
    const supplierId = request.params.id;
    const { name, mobile, fax, address, tax } = request.body;
    const updatedSupplier = await SupplierModel.findByIdAndUpdate(
      supplierId,
      { name, mobile, fax, address, tax },
      { new: true }
    );
    response.send({msg: "Supplier updated successfully", updatedSupplier});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Delete Supplier
app.delete("/deleteSupplier/:id", async (request, response) => {
  try {
    const supplierId = request.params.id;
    await SupplierModel.findByIdAndDelete(supplierId);
    response.send({msg: "Supplier deleted successfully"});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Add Category
app.post("/addCategory", async (request, response) => {
  try {
    const { name } = request.body;
    const category = await CategoryModel.findOne({name: name});
    if (category) {
      response.status(409).json({msg: "Category already exists"});
    } else {
      const addCategory = CategoryModel({name});
      await addCategory.save();
      response.send({msg: "Category added successfully", addCategory});
    }
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Get Categories
app.get("/getCategories", async (request, response) => {
  try {
    const categoryList = await CategoryModel.find();
    response.send({categoryList: categoryList});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Edit Category
app.put("/editCategory/:id", async (request, response) => {
  try {
    const categoryId = request.params.id;
    const { name } = request.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    response.send({msg: "Category updated successfully", updatedCategory});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Delete Category
app.delete("/deleteCategory/:id", async (request, response) => {
  try {
    const categoryId = request.params.id;
    await CategoryModel.findByIdAndDelete(categoryId);
    response.send({msg: "Category deleted successfully"});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Add Branch
app.post("/addBranch", async (request, response) => {
  try {
    const { name, mobile } = request.body;
    const branch = await BranchModel.findOne({name: name, mobile: mobile});
    if (branch) {
      response.status(409).json({msg: "Branch already exists"});
    } else {
      const addBranch = BranchModel({name, mobile});
      await addBranch.save();
      response.send({msg: "Branch added successfully", addBranch});
    }
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Get Branches
app.get("/getBranches", async (request, response) => {
  try {
    const branchList = await BranchModel.find();
    response.send({branchList: branchList});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Edit Branch
app.put("/editBranch/:id", async (request, response) => {
  try {
    const branchId = request.params.id;
    const { name, mobile } = request.body;
    const updatedBranch = await BranchModel.findByIdAndUpdate(
      branchId,
      { name, mobile },
      { new: true }
    );
    response.send({msg: "Branch updated successfully", updatedBranch});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Delete Branch
app.delete("/deleteBranch/:id", async (request, response) => {
  try {
    const branchId = request.params.id;
    await BranchModel.findByIdAndDelete(branchId);
    response.send({msg: "Branch deleted successfully"});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
});

// Get System
app.get("/getSystem", async (request, response) => {
  try {
    const systemData = await SystemModel.findOne();
    if (systemData) {
      const logo = `${request.protocol}://${request.get('host')}/assets/${systemData.logo}`;
      response.send({systemData, logo});
    }
  } catch(error) {
    response.status(500).json({msg: error.message});
  }
});

// Save System
app.post("/saveSystem", upload.single('logo'), async (request, response) => {
  try {
    const {brand, vat, currency, receiptMsg} = request.body;
    const logo = request.file?.originalname;
    const system = await SystemModel.findOne();
    if (system) {
      if (system.logo && logo) {
        const oldLogoPath = `./assets/${system.logo}`;
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }
      const systemData = await SystemModel.findByIdAndUpdate(
        system._id,
        {brand, vat, logo, currency, receiptMsg},
        { new: true }
      )
      systemData.save();
    } else {
      const systemData = SystemModel({brand, vat, logo, currency, receiptMsg});
      await systemData.save();
    }
    response.send({msg: "Settings saved successfully"})
  } catch(error) {
    response.status(500).json({msg: error.message})
  }
});