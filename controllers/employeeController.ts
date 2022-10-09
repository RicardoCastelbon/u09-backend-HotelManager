const createEmployee = async (req: any, res: any) => {
  res.send("Create Employee");
};

const getAllEmployees = async (req: any, res: any) => {
  res.send("Get all employees");
};

const updateEmployee = async (req: any, res: any) => {
  res.send("Update employee");
};

const deleteEmployee = async (req: any, res: any) => {
  res.send("Delete employee");
};

export { createEmployee, getAllEmployees, updateEmployee, deleteEmployee };
