import Department from "../models/Department.js";


const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find() 
        return res.status(200).json({success: true, departments})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get Department Server Error"})
    }
}
const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep});

    } catch (error) {
        return res.status(500).json({success: false, error: "Add Department Server error !"});
    }
}

const getDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({success: true, department})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get Department Server Error"})
    }
}

const updateDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDep = await Department.findByIdAndUpdate({_id : id}, {
            dep_name,
            description
        }) 
        return res.status(200).json({success: true, updateDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "Edit Department Server Error !"})        
    }

}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;  // Use id as a parameter
        const deleteDep = await Department.findByIdAndDelete(id);  // Don't need to use _id explicitly

        if (!deleteDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, message: "Department deleted successfully", deletedDepartment: deleteDep });
    } catch (error) {
        console.error("Delete Department Error:", error);  // Log the error for debugging
        return res.status(500).json({ success: false, error: "Delete Department Server Error !" });
    }
};

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}