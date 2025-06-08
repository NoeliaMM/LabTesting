import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('./pods/project/project.mapper', () => {
  it.each<{ project: apiModel.Project }>([
    { project: undefined },
    { project: null },
  ])(
    'should return empty project when it feeds projects equals $project',
    ({ project }) => {
      // Arrange

      // Act
      const result = mapProjectFromApiToVm(project);

      const expectedResult = viewModel.createEmptyProject();
      // Assert

      expect(result).toEqual(expectedResult);
    }
  );

  it('should map an employee summary from api to viewmodel correctly', () => {
    const apiEmployeeSummary: apiModel.EmployeeSummary = {
      id: '1',
      isAssigned: true,
      employeeName: 'Alice',
    };

    const result = mapEmployeeSummaryFromApiToVm(apiEmployeeSummary);

    expect(result).toEqual(apiEmployeeSummary);
  });

  it('should map a list of employee summaries correctly', () => {
    // Arrange
    const apiListEmployees: apiModel.EmployeeSummary[] = [
      { id: '1', isAssigned: true, employeeName: 'Alice' },
      { id: '2', isAssigned: false, employeeName: 'Bob' },
      { id: '3', isAssigned: true, employeeName: 'Charlie' },
    ];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(apiListEmployees);

    //Assert
    expect(result).toEqual(apiListEmployees);
  });

  it('should map a project from api to viewmodel correctly', () => {
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Project 1',
      externalId: 'CODE-1',
      comments: 'Lorem ipsum',
      isActive: true,
      employees: [
        { id: '1', isAssigned: true, employeeName: 'Alice' },
        { id: '2', isAssigned: false, employeeName: 'Bob' },
      ],
    };

    const result = mapProjectFromApiToVm(apiProject);

    expect(result).toEqual({
      ...apiProject,
      employees: apiProject.employees,
    });
  });
});
