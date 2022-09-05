package sg.edu.nus.prs.domain.common;

import java.util.Objects;

public class Supplier {
    private String supplierCode;
    private String supplierName;
    private String countryCode;
    private boolean defunct;

    public Supplier() {}

    public Supplier(String supplierCode, String supplierName) {
        this.supplierCode = supplierCode;
        this.supplierName = supplierName;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public boolean isDefunct() {
        return defunct;
    }

    public void setDefunct(boolean defunct) {
        this.defunct = defunct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Supplier supplier = (Supplier) o;
        return Objects.equals(getSupplierCode(), supplier.getSupplierCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSupplierCode());
    }
}
