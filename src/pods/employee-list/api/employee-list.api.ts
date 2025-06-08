import { Employee } from './employee-list.api-model';
import { mockEmployeeList as defaultMock } from './employee-list.mock-data';

let employeeList :Employee[] = [];

//Para poder simular en el test e2e y permitir inyectar mock desde window
const initialize = () => {
  if (typeof window !== 'undefined' && (window as any).mockEmployeeList) {
    employeeList = [...(window as any).mockEmployeeList];
  } else {
    employeeList = [...defaultMock];
  }
};

initialize();

export const getEmployeeList = async (): Promise<Employee[]> => {
  return employeeList;
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  employeeList = employeeList.filter(e => e.id !== id);
  return true;
};
