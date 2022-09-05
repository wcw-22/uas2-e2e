const Page = require('./page')

class PrsAppPurchaseNewAorSearch_Biological extends Page {
  get biological_link () { return $('LI:nth-of-type(2) > A.nav-link') } 
  get category_select () { return $('#biologicalCategoryCode') } 
  // available 7 options: 'Please Select', 'Arthropods', 'Biological Agent', 'Biological Toxins', 'Nucleic Acid', 'Proteins', 'Tissues/Cells', 

  get biologicalType_select () { return $('#biologicalTypeCode') } 
  // available 32 options: 'Please Select', 'Allergen', 'Antibody', 'Bacteria', 'Bee', 'Beetle', 'Butterfly & Moth', 'Cricket', 'DNA', 'Established/Commercial cells/Cell line', 'Fly', 'Fungi (including Yeast)', 'Grasshopper', 'Leaf Insect', 'Mantis', 'Mealworm', 'Mosquito', 'Other Proteins', 'Parasite (including protozoa and nematode)', 'Plasmid/Vectors/Clones', 'Primary cells', 'Primary tissues', 'Primers', 'Prion', 'RNA', 'Recombinant Proteins', 'Restriction Enzymes', 'Spider', 'Virus/Bacteriophage', 'miRNA', 'sgRNA', 'shRNA', 

  get search_span () { return $('#biologicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_Biological

module.exports = new PrsAppPurchaseNewAorSearch_Biological();

