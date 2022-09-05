package sg.edu.nus.prs.dao;

import java.util.List;

import sg.edu.nus.prs.domain.common.*;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalCategory;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalMaterialName;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalOrgan;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalOrigin;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalStrain;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalType;
import sg.edu.nus.prs.domain.purchase.ScientificName;
import sg.edu.nus.prs.domain.purchase.radioactive.RadioactiveSourceType;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;

public interface LookupDAO {
    List<Faculty> getFaculties();

    Faculty getFacultyBySAPCode(String sapFacultyCode);

    List<Department> getDepartmentsOfFaculty(String facultyCode);

    Department getDepartmentByCode(String departmentCode);

    Department getDepartmentBySAPCode(String departmentCode);

    List<Faculty> getFacultiesWithDepartments();

    Faculty getFacultyOfDepartment(String departmentCode);

    List<UnitMeasure> getUnitMeasures();
    
    List<UnitMsr> getUnitMeasuresOfRadioActivity();

    List<PhysicalForm> getPhysicalForms();

    List<Currency> getCurrencies();

    List<Supplier> searchSupplier(String partial);

    List<Supplier> getSupplierByCode(String supplierCode);
    
    List<Supplier> getSuppliers();
    
    ControlParameter getParameter(ControlParameterCode parameterCode);

    List<ChemicalGrade> getChemicalGrades();

    List<ConcentrationUnit> getConcentrationUnits();

    List<ConversionRule> getConversionRules();

    List<GLAccount> getGLAccounts();

    GLAccount getGLAccountByCode(String glAccount);
    
    List<InternalStore> getInternalStores();
    
    InternalStore getInternalStoreBySupplierCode(String supplierCode);
    
    List<RadioactiveSourceType> getRadioactiveSourceTypes();

    List<RadioactiveConcentrationUnit> getRadioactiveConcentrationUnits();

    List<BiologicalCategory> getBiologicalCategories();

    List<BiologicalType> getBiologicalTypes();

    List<BiologicalOrigin> getBiologicalOrigins();

    List<BiologicalOrgan> getBiologicalOrganTypes();

    List<BiologicalStrain> searchStrain(String partial);

    List<ScientificName> searchScientificName(String partial);

    List<BiologicalMaterialName> searchBiologicalMaterialName(String partial);

    List<String> searchBiologicalProductNumber(String partial);

}
