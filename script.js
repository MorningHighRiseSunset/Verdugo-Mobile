//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let currentStreak = 0;
let highestScore = 0;


// Ensure the correct words list container exists only once
const correctWordsList = document.getElementById("correct-words-list") || createCorrectWordsList();

function createCorrectWordsList() {
  if (!document.getElementById("correct-words-list")) {
      const listContainer = document.createElement("div");
      listContainer.id = "correct-words-list";
      listContainer.className = "correct-words-container";
      listContainer.style.maxHeight = '600px'; // Ensure max-height is set
      listContainer.style.overflowY = 'auto'; // Ensure overflow is auto
      document.body.appendChild(listContainer);
      return listContainer;
  }
  return document.getElementById("correct-words-list");
}

//Options values for buttons
let options = {
  "Normal Mode": [
    { word: "loop", definition: "A length of thread, line or rope that is doubled over to make an opening." },
    { word: "grana", definition: "A stack-like structure in plant chloroplasts that contain chlorophyll; the site of photosynthesis." },
    { word: "razz", definition: "A version of seven card stud where the worst poker hand wins (called lowball)." },
    { word: "tires", definition: "To become sleepy or weary." },
    { word: "tansy", definition: "A herbaceous plant with yellow flowers, of the genus Tanacetum, especially Tanacetum vulgare." },
    { word: "bully", definition: "A person who is intentionally, physically, or emotionally cruel to others; especially to those who are weaker or have less power or privilege." },
    { word: "divan", definition: "A Muslim council of state, specifically that of viziers of the Ottoman Empire that discussed and recommended new laws and law changes to a higher authority (the sultan)." },
    { word: "hotel", definition: "A large town house or mansion; a grand private residence, especially in France." },
    { word: "far", definition: "Distant; remote in space." },
    { word: "kooky", definition: "Eccentric, strange, or foolish; crazy or insane; kookish." },
    { word: "goth", definition: "A punk-derived subculture of people who predominantly dress in black, associated with mournful music and attitudes." },
    { word: "dimes", definition: "A coin worth one-tenth of a U.S. dollar." },
    { word: "flags", definition: "A piece of cloth, often decorated with an emblem, used as a visual signal or symbol." },
    { word: "cred", definition: "(urban) Credibility." },
    { word: "pech", definition: "To pant, to struggle for breath." },
    { word: "gores", definition: "(of an animal) To pierce with the horn." },
    { word: "asks", definition: "To request (information, or an answer to a question)." },
    { word: "pions", definition: "Any of three semistable mesons, having positive, negative or neutral charge, composed of up and down quarks/antiquarks." },
    { word: "apo", definition: "(of a protein) In an inactive, unbound state" },
    { word: "delay", definition: "A period of time before an event occurs; the act of delaying; procrastination; lingering inactivity." },
    { word: "vase", definition: "An upright open container used mainly for displaying fresh, dried, or artificial flowers." },
    { word: "poly", definition: "Polytechnic." },
    { word: "songs", definition: "A musical composition with lyrics for voice or voices, performed by singing." },
    { word: "foe", definition: "An enemy." },
    { word: "mols", definition: "In the International System of Units, the base unit of amount of substance; the amount of substance of a system which contains as many elementary entities (atoms, ions, molecules, etc.) as there are atoms in 0.012 kg of carbon-12. Symbol: mol. The number of atoms is known as Avogadro’s number." },
    { word: "stot", definition: "An inferior horse." },
    { word: "shaft", definition: "The entire body of a long weapon, such as an arrow." },
    { word: "franc", definition: "A former unit of currency of France, Belgium and Luxembourg, replaced by the euro." },
    { word: "tonus", definition: "Tonicity; tone" },
    { word: "feet", definition: "A biological structure found in many animals that is used for locomotion and that is frequently a separate organ at the terminal part of the leg." },
    { word: "flats", definition: "An area of level ground." },
    { word: "booby", definition: "A stupid person." },
    { word: "tizzy", definition: "A state of nervous excitement, confusion, or distress; a dither." },
    { word: "erg", definition: "The unit of work or energy, being the amount of work done by a force of one dyne applied through a distance of one centimeter. Equal to 10−7 joules." },
    { word: "peace", definition: "A state of tranquility, quiet, and harmony; absence of violence. For instance, a state free from civil disturbance." },
    { word: "lours", definition: "To frown; to look sullen." },
    { word: "parol", definition: "A word; an oral utterance." },
    { word: "tolar", definition: "A state currency formerly used by the Republic of Slovenia between 1991 and 2006, divided into 100 stotins." },
    { word: "lemon", definition: "A yellowish citrus fruit." },
    { word: "waken", definition: "To wake or rouse from sleep." },
    { word: "trait", definition: "An identifying characteristic, habit or trend." },
    { word: "pox", definition: "A disease characterized by purulent skin eruptions that may leave pockmarks." },
    { word: "cafes", definition: "A convenience store, originally one that sold coffee and similar basic items." },
    { word: "yelp", definition: "An abrupt, high-pitched noise or utterance." },
    { word: "lobo", definition: "A wolf." },
    { word: "gismo", definition: "Something, generally a device, for which one does not know the proper term." },
    { word: "could", definition: "(auxiliary verb, defective) To know how to; to be able to." },
    { word: "tern", definition: "Any of various sea birds of the family Sternidae that are similar to gulls but are smaller and have a forked tail." },
    { word: "carex", definition: "Any member of the genus Carex of sedges." },
    { word: "alecs", definition: "An anchovy or herring, especially pickled or dried." },
    { word: "frigs", definition: "An act of frigging." },
    { word: "yacks", definition: "(possibly obsolete) An oak." },
    { word: "vex", definition: "A trouble." },
    { word: "adult", definition: "A fully grown human or animal." },
    { word: "rands", definition: "The border of an area of land, especially marshland." },
    { word: "hump", definition: "A mound of earth." },
    { word: "moved", definition: "To change place or posture; to go, in any manner, from one place or position to another." },
    { word: "trust", definition: "Confidence in or reliance on some person or quality." },
    { word: "utes", definition: "A small vehicle based on the same platform as a family car but with a unibody construction and a built-in open tray area for carrying goods; similar but not identical to a pick-up truck." },
    { word: "lytic", definition: "Of, relating to, or causing lysis" },
    { word: "anent", definition: "Concerning, with regard to, about, in respect to, as to, insofar as, inasmuch as., apropos" },
    { word: "fork", definition: "A pronged tool having a long straight handle, used for digging, lifting, throwing etc." },
    { word: "hypha", definition: "Any of the long, threadlike filaments that form the mycelium of a fungus." },
    { word: "quail", definition: "To waste away; to fade, to wither" },
    { word: "kuna", definition: "The currency of Croatia, divided into 100 lipa" },
    { word: "ebon", definition: "(now poetic) Ebony; an ebony tree." },
    { word: "piggy", definition: "(hypocoristic) A pig (the animal)." },
    { word: "auks", definition: "Any of several species of Arctic sea birds of the family Alcidae." },
    { word: "pig", definition: "Any of several intelligent mammalian species of the genus Sus, having cloven hooves, bristles and a nose adapted for digging; especially the domesticated animal Sus scrofa." },
    { word: "thew", definition: "A bondman; a slave." },
    { word: "porn", definition: "Pornography." },
    { word: "linky", definition: "Of or pertaining to hyperlinks." },
    { word: "pya", definition: "A subdivision of currency, equal to one hundredth of a Burmese kyat." },
    { word: "mesh", definition: "A structure made of connected strands of metal, fiber, or other flexible/ductile material, with evenly spaced openings between them." },
    { word: "pimp", definition: "Someone who solicits customers for prostitution and acts as manager for a group of prostitutes; a pander." },
    { word: "amnio", definition: "Amniocentesis" },
    { word: "gout", definition: "An extremely painful inflammation of joints, especially of the big toe, caused by a metabolic defect resulting in the accumulation of uric acid in the blood and the deposition of urates around the joints." },
    { word: "limed", definition: "To treat with calcium hydroxide or calcium oxide (lime)." },
    { word: "colza", definition: "Oilseed rape (Brassica napus), cultivated for its seeds, which yield an oil, valued for illuminating and lubricating purposes." },
    { word: "bunt", definition: "The middle part, cavity, or belly of a sail; the part of a furled sail which is at the center of the yard." },
    { word: "wade", definition: "An act of wading." },
    { word: "veil", definition: "Something hung up or spread out to hide or protect the face, or hide an object from view; usually of gauze, crepe, or similar diaphanous material." },
    { word: "daws", definition: "A western jackdaw, Coloeus monedula, a passerine bird in the crow family (Corvidae), more commonly called jackdaw." },
    { word: "pries", definition: "To look where one is not welcome; to be nosy." },
    { word: "jiggy", definition: "Resembling or suggesting a jig." },
    { word: "tenia", definition: "A ribbon worn in the hair in ancient Greece." },
    { word: "swiss", definition: "To prepare (meat, fabric, etc.) by rolling or pounding in order to soften it." },
    { word: "brens", definition: "To burn (to set ablaze)." },
    { word: "hangs", definition: "To be or remain suspended." },
    { word: "skene", definition: "An element of ancient Greek theater: the structure at the back of the stage." },
    { word: "rets", definition: "To prepare (flax, hemp etc.) for further processing by soaking, which facilitates separation of fibers from the woody parts of the stem." },
    { word: "umbra", definition: "The fully shaded inner region of a shadow cast by an opaque object." },
    { word: "lezzy", definition: "A lesbian." },
    { word: "meows", definition: "The cry of a cat." },
    { word: "aide", definition: "An assistant." },
    { word: "mucin", definition: "Any of several glycoproteins found in mucus" },
    { word: "mates", definition: "The conclusive victory in a game of chess that occurs when an opponent's king is threatened with unavoidable capture." },
    { word: "sloes", definition: "The small, bitter, wild fruit of the blackthorn (Prunus spinosa)." },
    { word: "wheat", definition: "Any of several cereal grains, of the genus Triticum, that yields flour as used in bakery." },
    { word: "mobs", definition: "A large or disorderly group of people; especially one bent on riotous or destructive action." },
    { word: "omer", definition: "A former small Hebrew unit of dry volume equal to about 2.3 L or 2.1 quarts." },
    { word: "elect", definition: "One chosen or set apart." },
    { word: "watts", definition: "In the International System of Units, the derived unit of power; the power of a system in which one joule of energy is transferred per second. Symbol: W" },
    { word: "lined", definition: "To place (objects) into a line (usually used with 'up'); to form into a line; to align." },
    { word: "tiki", definition: "Carved talisman in humanoid form, common to the cultures of the Pacific Ocean." },
    { word: "woofs", definition: "To make a woofing sound." },
    { word: "dusts", definition: "Fine particles" },
    { word: "arame", definition: "A seaweed, Eisenia bicyclis, used in Japanese cuisine." },
    { word: "dunam", definition: "An Ottoman Turkish unit of surface area nominally equal to 1,600 square (Turkish) paces but actually varied at a provincial and local level according to land quality to accommodate its colloquial sense of the amount of land able to be plowed in a day, roughly equivalent to the Byzantine stremma or English acre." },
    { word: "ascot", definition: "Ascot tie" },
    { word: "tranq", definition: "A tranquilizer." },
    { word: "diced", definition: "To play dice." },
    { word: "loop", definition: "A length of thread, line or rope that is doubled over to make an opening." },
    { word: "raves", definition: "An enthusiastic review (such as of a play)." },
    { word: "fuzzy", definition: "(often in the plural) A very small piece of plush material." },
    { word: "glims", definition: "Brightness; splendour" },
    { word: "throb", definition: "A beating, vibration or palpitation." },
    { word: "brier", definition: "Any of many plants with thorny stems growing in dense clusters, such as many in the Rosa, Rubus, and Smilax genera." },
    { word: "aloft", definition: "At, to, or in the air or sky." },
    { word: "romp", definition: "Someone who romps; especially, a girl or young woman who indulges in boisterous play; a tomboy." },
    { word: "vats", definition: "A large tub, such as is used for making wine or for tanning." },
    { word: "carr", definition: "A bog or marsh; marshy ground, swampland." },
    { word: "corse", definition: "A (living) body." },
    { word: "hertz", definition: "In the International System of Units, the derived unit of frequency; one (period or cycle of any periodic event) per second. Symbol: Hz" },
    { word: "maker", definition: "Someone who makes; a person or thing that makes or produces something." },
    { word: "pent", definition: "To enclose in a pen." },
    { word: "cyano", definition: "(especially in combination) a univalent functional group, -CN, consisting of a carbon and a nitrogen atom joined with a triple bond; organic compounds containing a cyano group are nitriles" },
    { word: "pure", definition: "One who, or that which, is pure." },
    { word: "sized", definition: "To adjust the size of; to make a certain size." },
    { word: "arid", definition: "Very dry." },
    { word: "batt", definition: "Pieces of fabric or fibre used for stuffing; as for batting or insulation" },
    { word: "cuish", definition: "Defensive armour for the thighs" },
    { word: "joist", definition: "A piece of timber laid horizontally, or nearly so, to which the planks of the floor, or the laths or furring strips of a ceiling, are nailed." },
    { word: "libel", definition: "A written or pictorial false statement which unjustly seeks to damage someone's reputation." },
    { word: "mag", definition: "(abbreviation) magazine (publication or ammunition)" },
    { word: "eaves", definition: "The underside of a roof that extends beyond the external walls of a building." },
    { word: "civil", definition: "Having to do with people and government office as opposed to the military or religion." },
    { word: "khats", definition: "A shrub, Catha edulis, whose leaves are used as a mild stimulant when chewed or brewed as tea; also a drug produced from this plant." },
    { word: "brag", definition: "A boast or boasting; bragging; ostentatious pretence or self-glorification." },
    { word: "snool", definition: "An abject, cowardly person who submits tamely to others." },
    { word: "ism", definition: "An ideology, system of thought, or practice that can be described by a word ending in -ism." },
    { word: "otto", definition: "An essential oil extracted from flowers." },
    { word: "nit", definition: "The egg of a louse." },
    { word: "tache", definition: "Moustache, mustache." },
    { word: "hubs", definition: "The central part, usually cylindrical, of a wheel; the nave." },
    { word: "vat", definition: "A large tub, such as is used for making wine or for tanning." },
    { word: "rue", definition: "Sorrow; repentance; regret." },
    { word: "rains", definition: "Condensed water falling from a cloud." },
    { word: "tided", definition: "To cause to float with the tide; to drive or carry with the tide or stream." },
    { word: "elate", definition: "To make joyful or proud." },
    { word: "lust", definition: "A feeling of strong desire, especially such a feeling driven by sexual arousal." },
    { word: "alula", definition: "A small projection of three or four feathers on the first digit of the wing on some birds." },
    { word: "tarty", definition: "Like a tart (promiscuous woman); slutty, whorish." },
    { word: "grits", definition: "(usually in the plural) Husked but unground oats." },
    { word: "need", definition: "A requirement for something; something needed." },
    { word: "tided", definition: "To cause to float with the tide; to drive or carry with the tide or stream." },
    { word: "souks", definition: "A street market, particularly in Arabic- and Somali-speaking countries; a place where people buy and sell goods." },
    { word: "emcee", definition: "A rapper." },
    { word: "direr", definition: "Warning of bad consequences: ill-boding; portentous." },
    { word: "paeon", definition: "A foot containing any pattern of three short syllables and one long syllable." },
    { word: "dairy", definition: "(also dairy products or dairy produce) Products produced from milk." },
    { word: "gigue", definition: "An Irish dance, derived from the jig, used in the Partita form (Baroque Period)." },
    { word: "gurry", definition: "A circular gong that was struck at regular intervals to indicate the time." },
    { word: "gunny", definition: "A coarse heavy fabric made of jute or hemp." },
    { word: "eyre", definition: "A journey in circuit of certain itinerant judges called justices in eyre (or in itinere)." },
    { word: "rodeo", definition: "A gathering of cattle to be branded." },
    { word: "salp", definition: "Any of the free-swimming tunicates of the order Salpida and its single family Salpidae." },
    { word: "fas", definition: "A syllable used in solfège to represent the fourth note of a major scale." },
    { word: "lynch", definition: "To execute (somebody) without a proper legal trial or procedure, especially by hanging and backed by a mob." },
    { word: "dole", definition: "Money or other goods given as charity." },
    { word: "pinta", definition: "A pint of milk." },
    { word: "ormer", definition: "An abalone or sea-ear, particularly Haliotis tuberculata, common in the Channel Islands." },
    { word: "gules", definition: "The throat; the gullet." },
    { word: "jugum", definition: "One of the ridges commonly found on the fruit of umbelliferous plants." },
    { word: "rangy", definition: "Slender and long of limb; lanky" },
    { word: "shirr", definition: "A shirring." },
    { word: "last", definition: "Final, ultimate, coming after all others of its kind." },
    { word: "cube", definition: "A regular polyhedron having six identical square faces." },
    { word: "tater", definition: "A potato." },
    { word: "twigs", definition: "A small thin branch of a tree or bush." },
    { word: "dhow", definition: "A traditional sailing vessel used along the coasts of Arabia, East Africa, and the Indian Ocean, generally having a single mast and a lateen sail." },
    { word: "trays", definition: "A small, typically rectangular or round, flat, and rigid object upon which things are carried." },
    { word: "vars", definition: "A unit of electrical power, in an AC circuit, equal to the power dissipated when 1 volt produces a current of 1 ampere." },
    { word: "frag", definition: "A fragmentation grenade." },
    { word: "wryly", definition: "In a wry manner." },
    { word: "fish", definition: "A cold-blooded vertebrate animal that lives in water, moving with the help of fins and breathing with gills." },
    { word: "duomo", definition: "A cathedral, especially one in Italy." },
    { word: "time", definition: "The inevitable progression into the future with the passing of present and past events." },
    { word: "maw", definition: "The stomach, especially of an animal." },
    { word: "prole", definition: "A member of the proletariat; a proletarian" },
    { word: "crick", definition: "A painful muscular cramp or spasm of some part of the body, as of the neck or back, making it difficult to move the part affected. (Compare catch.)" },
    { word: "apses", definition: "A semicircular projection from a building, especially the rounded east end of a church that contains the altar." },
    { word: "facia", definition: "A wide band of material covering the ends of roof rafters, sometimes supporting a gutter in steep-slope roofing, but typically it is a border or trim in low-slope roofing." },
    { word: "ant", definition: "Any of various insects in the family Formicidae in the order Hymenoptera, typically living in large colonies composed almost entirely of flightless females." },
    { word: "ortho", definition: "An isomer of a benzene derivative having two substituents adjacent on the ring." },
    { word: "bazoo", definition: "A simple wind instrument, such as a kazoo or tin horn." },
    { word: "luffa", definition: "A tropical vine, of the genus Luffa, having almost cylindrical fruit with a spongy, fibrous interior; the dishcloth gourd" },
    { word: "chape", definition: "The piece by which an object is attached to something, such as the frog of a scabbard or the metal loop at the back of a buckle by which it is fastened to a strap." },
    { word: "knops", definition: "A knob, usually ornamental" },
    { word: "tiers", definition: "One who ties (knots, etc)." },
    { word: "felts", definition: "To make into felt, or a feltlike substance; to cause to adhere and mat together." },
    { word: "neath", definition: "Beneath." },
    { word: "sunup", definition: "The time of day when the sun appears above the eastern horizon." },
    { word: "asset", definition: "Something or someone of any value; any portion of one's property or effects so considered." },
    { word: "sitar", definition: "A Hindustani/Indian classical stringed instrument, typically having a gourd as its resonating chamber." },
    { word: "hare", definition: "Any of several plant-eating animals of the family Leporidae, especially of the genus Lepus, similar to a rabbit, but larger and with longer ears." },
    { word: "snits", definition: "A temper; a lack of patience; a bad mood." },
    { word: "eight", definition: "The digit/figure 8." },
    { word: "wreak", definition: "To cause something harmful; to afflict; to inflict; to harm or injury; to let out something harmful; ." },
    { word: "owned", definition: "To have rightful possession of (property, goods or capital); to have legal title to." },
    { word: "bowl", definition: "A roughly hemispherical container used to hold, mix or present food, such as salad, fruit or soup, or other items." },
    { word: "marl", definition: "A mixed earthy substance, consisting of carbonate of lime, clay, and possibly sand, in very variable proportions, and accordingly designated as calcareous, clayey, or sandy." },
    { word: "dorps", definition: "A village or small town; a town considered provincial." },
    { word: "purls", definition: "A particular stitch in knitting; an inversion of stitches giving the work a ribbed or waved appearance." },
    { word: "dad", definition: "A father, a male parent." },
    { word: "shoyu", definition: "A dark form of soy sauce" },
    { word: "hemp", definition: "A tall annual herb, Cannabis sativa, native to Asia." },
    { word: "air", definition: "The substance constituting earth's atmosphere, particularly:" },
    { word: "buyer", definition: "A person who makes one or more purchases." },
    { word: "worst", definition: "Unfavorable; negative; not good." },
    { word: "spile", definition: "A splinter." },
    { word: "cruel", definition: "To spoil or ruin (one's chance of success)" },
    { word: "pond", definition: "An inland body of standing water, either natural or man-made, that is smaller than a lake." },
    { word: "swamp", definition: "A piece of wet, spongy land; low ground saturated with water; soft, wet ground which may have a growth of certain kinds of trees, but is unfit for agricultural or pastoral purposes." },
    { word: "antes", definition: "A price or cost, as in up the ante." },
    { word: "carpi", definition: "The group of bones that make up the wrist." },
    { word: "hedge", definition: "A thicket of bushes or other shrubbery, especially one planted as a fence between two portions of land, or to separate the parts of a garden." },
    { word: "totes", definition: "A tote bag." },
    { word: "mushy", definition: "Resembling or having the consistency of mush; semiliquid, pasty, or granular." },
    { word: "ziti", definition: "A type of penne pasta in the form of long smooth hollow tubes." },
    { word: "lysed", definition: "To burst or cut a cell or cell structure; to induce lysis." },
    { word: "oxy", definition: "The bivalent R-O-R functional group found in ethers." },
    { word: "ousts", definition: "To expel; to remove." },
    { word: "loos", definition: "A half-mask, particularly those velvet half-masks fashionable in the 17th century as a means of protecting women's complexion from the sun." },
    { word: "buyer", definition: "A person who makes one or more purchases." },
    { word: "amens", definition: "An instance of saying ‘amen’." },
    { word: "flic", definition: "A data file containing computer animations." },
    { word: "visor", definition: "A part of a helmet, arranged so as to lift or open, and so show the face. The openings for seeing and breathing are generally in it." },
    { word: "pion", definition: "Any of three semistable mesons, having positive, negative or neutral charge, composed of up and down quarks/antiquarks." },
    { word: "meets", definition: "A sports competition, especially for track and field (a track meet) or swimming (a swim meet)." },
    { word: "gully", definition: "A trench, ravine or narrow channel which was worn by water flow, especially on a hillside." },
    { word: "zappy", definition: "Lively or energetic." },
    { word: "wats", definition: "A Buddhist temple in Southeast Asia." },
    { word: "toyon", definition: "A chiefly Californian ornamental evergreen shrub (Heteromeles arbutifolia) of the rose family having white flowers succeeded by red berries." },
    { word: "mere", definition: "A body of standing water, such as a lake or a pond. More specifically, it can refer to a lake that is broad in relation to its depth. Also included in place names such as Windermere." },
    { word: "been", definition: "A flying insect, of the clade Anthophila within the hymenopteran superfamily Apoidea, known for its organised societies (though only a minority have them), for collecting pollen and (in some species) producing wax and honey." },
    { word: "waste", definition: "Excess of material, useless by-products or damaged, unsaleable products; garbage; rubbish." },
    { word: "mitts", definition: "A mitten" },
    { word: "dank", definition: "Moisture; humidity; water." },
    { word: "feel", definition: "A quality of an object experienced by touch." },
    { word: "choky", definition: "Reminiscent of choking." },
    { word: "teeny", definition: "Very small; tiny." },
    { word: "tules", definition: "Any of a number of large freshwater sedges of western North America formerly classified in the genus Scirpus, but now mostly as Schoenoplectus" },
    { word: "lungi", definition: "A garment worn around the waist, especially by men, in Southern India, Bangladesh, Burma, and Pakistan." },
    { word: "foist", definition: "A thief or pickpocket." },
    { word: "cento", definition: "A hotchpotch, a mixture; especially a piece made up of quotations from other authors, or a poem containing individual lines from other poems." },
    { word: "rugby", definition: "(usually uncountable) A form of football in which players can hold or kick an ovoid ball. The ball cannot be handled forwards and points are scored by touching the ball to the ground in the area past their opponent’s territory or kicking the ball between goalposts and over a crossbar." },
    { word: "crock", definition: "A stoneware or earthenware jar or storage container." },
    { word: "wren", definition: "Any member of a mainly New World passerine bird family Troglodytidae; true wren." },
    { word: "films", definition: "A thin layer of some substance; a pellicle; a membranous covering, causing opacity." },
    { word: "moldy", definition: "Covered with mold." },
    { word: "feet", definition: "A biological structure found in many animals that is used for locomotion and that is frequently a separate organ at the terminal part of the leg." },
    { word: "choir", definition: "Singing group; group of people who sing together; company of people who are trained to sing together." },
    { word: "coons", definition: "(racial slur) A black person." },
    { word: "ers", definition: "To utter the word 'er' when hesitating in speech, found in the phrase um and er." },
    { word: "dorks", definition: "A long Scottish dagger with a straight blade." },
    { word: "elect", definition: "One chosen or set apart." },
    { word: "due", definition: "Deserved acknowledgment." },
    { word: "spite", definition: "Ill will or hatred toward another, accompanied with the desire to irritate, annoy, or thwart; a want to disturb or put out another; mild malice" },
    { word: "match", definition: "A competitive sporting event such as a boxing meet, a baseball game, or a cricket match." },
    { word: "beaks", definition: "Anatomical uses." },
    { word: "avail", definition: "Effect in achieving a goal or aim; purpose, use (now usually in negative constructions)." },
    { word: "limba", definition: "A large African tree, Terminalia superba, whose hard wood is used for furniture, table tennis paddles and musical instruments." },
    { word: "habit", definition: "An action performed on a regular basis." },
    { word: "inapt", definition: "Unapt" },
    { word: "wedge", definition: "One of the simple machines; a piece of material, such as metal or wood, thick at one edge and tapered to a thin edge at the other for insertion in a narrow crevice, used for splitting, tightening, securing, or levering." },
    { word: "yawed", definition: "To turn about the vertical axis while maintaining course." },
    { word: "durst", definition: "To have enough courage (to do something)." },
    { word: "pyre", definition: "A funeral pile; a combustible heap on which corpses are burned." },
    { word: "zein", definition: "A protein derived from corn/maize, having many industrial applications." },
    { word: "woozy", definition: "Queasy, dizzy, or disoriented" },
    { word: "eking", definition: "The act or process of adding." },
    { word: "got", definition: "(ditransitive) To obtain; to acquire." },
    { word: "cabby", definition: "A cabdriver; someone who drives a taxi." },
    { word: "barbs", definition: "The point that stands backward in an arrow, fishhook, etc., to prevent it from being easily extracted. Hence: Anything which stands out with a sharp point obliquely or crosswise to something else." },
    { word: "type", definition: "A grouping based on shared characteristics; a class." },
    { word: "nocks", definition: "To fit an arrow against the bowstring of a bow or crossbow. (See also notch.)" },
    { word: "doff", definition: "(clothing) To remove or take off, especially of clothing." },
    { word: "al", definition: "The Indian mulberry, Morinda citrifolia, especially as used to make dye." },
    { word: "ended", definition: "To come to an end" },
    { word: "rend", definition: "A violent separation of parts." },
    { word: "tors", definition: "A craggy outcrop of rock on the summit of a hill, created by the erosion and weathering of rock." },
    { word: "poppa", definition: "(sometimes childish) father, papa." },
    { word: "axle", definition: "Shoulder." },
    { word: "foods", definition: "Any solid substance that can be consumed by living organisms, especially by eating, in order to sustain life." },
    { word: "atilt", definition: "At an angle from the vertical or horizontal." },
    { word: "zayin", definition: "The seventh letter of many Semitic alphabets (Phoenician, Aramaic, Hebrew, Syriac, Arabic and others)." },
    { word: "stilt", definition: "Either of two poles with footrests that allow someone to stand or walk above the ground; used mostly by entertainers." },
    { word: "cutty", definition: "A short spoon." },
    { word: "palls", definition: "Senses relating to cloth." },
    { word: "fork", definition: "A pronged tool having a long straight handle, used for digging, lifting, throwing etc." },
    { word: "hade", definition: "State; order, estate, rank, degree, or quality." },
    { word: "levo", definition: "(of an optically active compound or crystal) That rotates the plane of polarized light to the left, or anticlockwise." },
    { word: "hooey", definition: "Silly talk or writing; nonsense, silliness, or fake assertion(s)." },
    { word: "abuts", definition: "To touch by means of a mutual border, edge or end; to border on; to lie adjacent (to); to be contiguous (said of an area of land)" },
    { word: "haply", definition: "By accident or luck." },
    { word: "arks", definition: "A large box with a flat lid." },
    { word: "vids", definition: "Videotape" },
    { word: "abyss", definition: "Hell; the bottomless pit; primeval chaos; a confined subterranean ocean." },
    { word: "ruly", definition: "Pitiable; miserable." },
    { word: "helps", definition: "Action given to provide assistance; aid." },
    { word: "ramen", definition: "Soup noodles of wheat, with various ingredients (Japanese style)" },
    { word: "bee", definition: "A flying insect, of the clade Anthophila within the hymenopteran superfamily Apoidea, known for its organised societies (though only a minority have them), for collecting pollen and (in some species) producing wax and honey." },
    { word: "auric", definition: "Of or pertaining to trivalent gold." },
    { word: "mac", definition: "A waterproof long coat made of rubberized cloth." },
    { word: "fuses", definition: "A cord that, when lit, conveys the fire to some explosive device." },
    { word: "laws", definition: "The body of binding rules and regulations, customs and standards established in a community by its legislative and judicial authorities." },
    { word: "kuru", definition: "A chronic, progressive, fatal central nervous system disease found mainly among the Fore and neighboring peoples of New Guinea, caused by a prion that probably resembles the scrapie agent of sheep, transmissible to nonhuman primates, and believed to be transmitted by ritual cannibalism." },
    { word: "muddy", definition: "To get mud on (something)." },
    { word: "brass", definition: "A metallic alloy of copper and zinc used in many industrial and plumbing applications." },
    { word: "dumpy", definition: "A short, stout person or animal, especially one of a breed of very short-legged chickens." },
    { word: "rex", definition: "An animal which has a genetic recessive variation that causes the guard hairs to be very short or fully lacking." },
    { word: "quaff", definition: "The act of quaffing; a deep draught." },
    { word: "malts", definition: "Malted grain (sprouted grain) (usually barley), used in brewing and otherwise." },
    { word: "froth", definition: "Foam" },
    { word: "fizz", definition: "An emission of a rapid stream of bubbles." },
    { word: "wasps", definition: "A member of the dominant American upper-class culture: a white Anglo-Saxon Protestant." },
    { word: "bawdy", definition: "Soiled, dirty." },
    { word: "cigs", definition: "Cigarette" },
    { word: "sarod", definition: "A fretless string instrument used mainly in Indian classical music." },
    { word: "mourn", definition: "Sorrow, grief." },
    { word: "moxa", definition: "Dried leaves of an Asian species of mugwort, Artemisia argyi as used in moxibustion." },
    { word: "limo", definition: "An automobile body with seats and permanent top like a coupe, and with the top projecting over the driver and a projecting front." },
    { word: "softy", definition: "A weak or sentimental person." },
    { word: "fizz", definition: "An emission of a rapid stream of bubbles." },
    { word: "snick", definition: "A small deflection of the ball off the side of the bat; often carries to the wicketkeeper for a catch" },
    { word: "ponce", definition: "A man living off another's earnings, especially a woman's." },
    { word: "adios", definition: "(in Spanish contexts) goodbye" },
    { word: "ween", definition: "Doubt; conjecture." },
    { word: "tsuba", definition: "The guard at the end of the grip of a sword." },
    { word: "tape", definition: "Flexible material in a roll with a sticky surface on one or both sides; adhesive tape." },
    { word: "lot", definition: "A large quantity or number; a great deal." },
    { word: "pule", definition: "A plaintive melancholy whine." },
    { word: "recta", definition: "The terminal part of the large intestine through which feces pass after exiting the colon." },
    { word: "chap", definition: "(obsolete outside Britain and Australia) A man, a fellow." },
    { word: "trues", definition: "To straighten." },
    { word: "guar", definition: "An annual legume (Cyamopsis tetragonoloba), used as a food for cattle and humans." },
    { word: "flung", definition: "To move (oneself) abruptly or violently; to rush or dash." },
    { word: "pixy", definition: "(fantasy literature, fairy tales) A playful sprite or elflike or fairy-like creature." },
    { word: "races", definition: "A contest between people, animals, vehicles, etc. where the goal is to be the first to reach some objective. Example: Several horses run in a horse race, and the first one to reach the finishing post wins" },
    { word: "pasts", definition: "The period of time that has already happened, in contrast to the present and the future." },
    { word: "close", definition: "An end or conclusion." },
    { word: "hood", definition: "A covering for the head attached to a larger garment such as a jacket or cloak." },
    { word: "node", definition: "A knot, knob, protuberance or swelling." },
    { word: "krewe", definition: "A private organization in New Orleans or elsewhere that exists to stage a Mardi Gras Ball, Mardi Gras Parade, or both." },
    { word: "curst", definition: "To place a curse upon (a person or object)." },
    { word: "goon", definition: "A thug; a usually muscular henchman with little intelligence (also known as a 'hired goon')." },
    { word: "decoy", definition: "A person or object meant to lure somebody into danger." },
    { word: "boxed", definition: "To place inside a box; to pack in one or more boxes." },
    { word: "flit", definition: "A fluttering or darting movement." },
    { word: "horde", definition: "A wandering troop or gang; especially, a clan or tribe of a nomadic people (originally Tatars) migrating from place to place for the sake of pasturage, plunder, etc.; a predatory multitude." },
    { word: "deuce", definition: "A card with two pips, one of four in a standard deck of playing cards." },
    { word: "tapis", definition: "A tapestry." },
    { word: "brat", definition: "A child who is regarded as mischievous, unruly, spoiled, or selfish." },
    { word: "tunes", definition: "A melody." },
    { word: "prove", definition: "To proofread." },
    { word: "fiend", definition: "A devil or demon; a malignant or diabolical being; an evil spirit." },
    { word: "hemp", definition: "A tall annual herb, Cannabis sativa, native to Asia." },
    { word: "drat", definition: "To damn or curse." },
    { word: "titer", definition: "The concentration of a substance as determined by titration." },
    { word: "afar", definition: "At, to, or from a great distance; far away." },
    { word: "guilt", definition: "Responsibility for wrongdoing." },
    { word: "give", definition: "The amount of bending that something undergoes when a force is applied to it; a tendency to yield under pressure; resilence." },
    { word: "years", definition: "A solar year, the time it takes the Earth to complete one revolution of the Sun (between 365.24 and 365.26 days depending on the point of reference)." },
    { word: "navel", definition: "The indentation or bump remaining in the abdomen of mammals where the umbilical cord was attached before birth." },
    { word: "pips", definition: "Any of various respiratory diseases in birds, especially infectious coryza." },
    { word: "smuts", definition: "Soot." },
    { word: "nonce", definition: "The one or single occasion; the present reason or purpose (now only in for the nonce)." },
    { word: "wins", definition: "To conquer, defeat." },
    { word: "teem", definition: "To be stocked to overflowing." },
    { word: "voila", definition: "Lo, there it is; see here; ta-da; presto; behold!" },
    { word: "poof", definition: "The product of flatulence, or the sound of breaking wind." },
    { word: "linos", definition: "An assistant referee." },
    { word: "indue", definition: "To pass food into the stomach; to digest; also figuratively, to take on, absorb." },
    { word: "braes", definition: "The sloping bank of a river valley." },
    { word: "dolls", definition: "A toy in the form of a human." },
    { word: "slant", definition: "A slope; an incline, inclination." },
    { word: "fonts", definition: "A receptacle in a church for holy water, especially one used in baptism." },
    { word: "digs", definition: "An archeological or paleontological investigation, or the site where such an investigation is taking place." },
    { word: "shape", definition: "The status or condition of something" },
    { word: "extra", definition: "Something additional, such as an item above and beyond the ordinary school curriculum, or added to the usual charge on a bill." },
    { word: "metal", definition: "(heading) Chemical elements or alloys, and the mines where their ores come from." },
    { word: "genua", definition: "Knee" },
    { word: "aldol", definition: "Any aldehyde or ketone having a hydroxy group in the beta- position" },
    { word: "lager", definition: "A type of beer, brewed using a bottom-fermenting yeast." },
    { word: "soap", definition: "A substance able to mix with both oil and water, used for cleaning, often in the form of a solid bar or in liquid form, derived from fats or made synthetically." },
    { word: "muley", definition: "(of cattle or deer) Without horns." },
    { word: "rep", definition: "To represent; to act as a representative for." },
    { word: "weave", definition: "A type or way of weaving." },
    { word: "lands", definition: "The part of Earth which is not covered by oceans or other bodies of water." },
    { word: "pyro", definition: "A pyromaniac" },
    { word: "tabus", definition: "An inhibition or ban that results from social custom or emotional aversion." },
    { word: "sugar", definition: "Sucrose in the form of small crystals, obtained from sugar cane or sugar beet and used to sweeten food and drink." },
    { word: "pasty", definition: "(chiefly in the plural) A small item of clothing that conceals little more than the nipple of a woman's breast, primarily worn by female exotic dancers." },
    { word: "media", definition: "The middle layer of the wall of a blood vessel or lymph vessel which is composed of connective and muscular tissue." },
    { word: "mag", definition: "(abbreviation) magazine (publication or ammunition)" },
    { word: "selah", definition: "A pause or rest of a contemplative nature." },
    { word: "gated", definition: "To keep something inside by means of a closed gate." },
    { word: "aired", definition: "To bring (something) into contact with the air, so as to freshen or dry it." },
    { word: "mound", definition: "An artificial hill or elevation of earth; a raised bank; an embankment thrown up for defense" },
    { word: "wants", definition: "A desire, wish, longing." },
    { word: "boys", definition: "A young male." },
    { word: "aves", definition: "An Ave Maria." },
    { word: "gad", definition: "An exclamatory interjection roughly equivalent to by God, goodness gracious, for goodness' sake." },
    { word: "podgy", definition: "Slightly fat." },
    { word: "ropy", definition: "Resembling rope in appearance or texture, used especially of muscles that are thick or hard to the touch." },
    { word: "shod", definition: "Wearing shoes." },
    { word: "phis", definition: "Φ, the 21st letter of the Euclidean and modern Greek alphabet, usually romanized as 'ph'." },
    { word: "haply", definition: "By accident or luck." },
    { word: "choke", definition: "A control on a carburetor to adjust the air/fuel mixture when the engine is cold." },
    { word: "wiles", definition: "(usually in the plural) A trick or stratagem practiced for ensnaring or deception; a sly, insidious artifice" },
    { word: "route", definition: "A course or way which is traveled or passed." },
    { word: "borer", definition: "A tedious person." },
    { word: "alms", definition: "Something given to the poor as charity, such as money, clothing or food." },
    { word: "dons", definition: "A title formerly borne by member of the high nobility of Portugal and Brazil" },
    { word: "porgy", definition: "Any of several fish of the family Sparidae; the sea bream." },
    { word: "socks", definition: "A knitted or woven covering for the foot." },
    { word: "novae", definition: "Any sudden brightening of a previously inconspicuous star." },
    { word: "gob", definition: "A lump of soft or sticky material." },
    { word: "etyma", definition: "The source word, or words, of a given word or expression." },
    { word: "john", definition: "A prostitute's client." },
    { word: "hub", definition: "The central part, usually cylindrical, of a wheel; the nave." },
    { word: "boar", definition: "A wild boar (Sus scrofa), the wild ancestor of the domesticated pig." },
    { word: "dog", definition: "A mammal, Canis familiaris or Canis lupus familiaris, that has been domesticated for thousands of years, of highly variable appearance due to human breeding." },
    { word: "stir", definition: "The act or result of stirring (moving around the particles of a liquid etc.)" },
    { word: "wins", definition: "To conquer, defeat." },
    { word: "acts", definition: "Something done, a deed." },
    { word: "blitz", definition: "A sudden attack, especially an air raid; usually with reference to the Blitz." },
    { word: "sarin", definition: "The neurotoxin O-isopropyl methylphosphonofluoridate, used as a chemical weapon." },
    { word: "gilds", definition: "To cover with a thin layer of gold; to cover with gold leaf." },
    { word: "swat", definition: "A hard stroke, hit or blow, e.g., as part of a spanking." },
    { word: "desks", definition: "A table, frame, or case, in past centuries usually with a sloping top but now usually with a flat top, for the use of writers and readers. It often has a drawer or repository underneath." },
    { word: "fuss", definition: "Excessive activity, worry, bother, or talk about something." },
    { word: "rural", definition: "A person from the countryside; a rustic." },
    { word: "sort", definition: "A general type." },
    { word: "pop", definition: "A loud, sharp sound as of a cork coming out of a bottle." },
    { word: "buy", definition: "Something which is bought; a purchase." },
    { word: "lemon", definition: "A yellowish citrus fruit." },
    { word: "lenis", definition: "A lenis consonant." },
    { word: "rille", definition: "A long, narrow depression that resembles a channel, found on the surface of various lunar and planetary bodies." },
    { word: "bani", definition: "A subdivision of currency, equal to one hundredth of a Romanian leu." },
    { word: "fuzes", definition: "(professional usage) An auxiliary device with explosive components, used to detonate a munition." },
    { word: "borer", definition: "A tedious person." },
    { word: "slink", definition: "A furtive sneaking motion." },
    { word: "scuba", definition: "(underwater diving) An apparatus carried by a diver, which includes a tank holding compressed, filtered air and a regulator which delivers the air to the diver at ambient pressure which can be used underwater." },
    { word: "rub", definition: "An act of rubbing." },
    { word: "beano", definition: "A beanfeast; any noisy celebration, a party." },
    { word: "dowry", definition: "Payment, such as property or money, paid by the bride's family to the groom or his family at the time of marriage." },
    { word: "jaunt", definition: "A wearisome journey." },
    { word: "arks", definition: "A large box with a flat lid." },
    { word: "expel", definition: "To eject or erupt." },
    { word: "paws", definition: "The soft foot of a mammal or other animal, generally a quadruped, that has claws or nails; comparable to a human hand or foot." },
    { word: "sipes", definition: "Slit in a tire to drain away surface water and improve traction." },
    { word: "octet", definition: "A group or set of eight of something." },
    { word: "wands", definition: "A hand-held narrow rod, usually used for pointing or instructing, or as a traditional emblem of authority." },
    { word: "glue", definition: "A hard gelatin made by boiling bones and hides, used in solution as an adhesive; or any sticky adhesive substance." },
    { word: "marc", definition: "The refuse matter that remains after fruit, particularly grapes, has been pressed." },
    { word: "snort", definition: "The sound made by exhaling or inhaling roughly through the nose." },
    { word: "molt", definition: "The process of shedding or losing a covering of fur, feathers or skin etc." },
    { word: "nervy", definition: "Having nerve; bold; brazen." },
    { word: "mercy", definition: "Relenting; forbearance to cause or allow harm to another." },
    { word: "mini", definition: "Miniature, tiny, small." },
    { word: "jumpy", definition: "Nervous and excited." },
    { word: "daps", definition: "Elaborate handshake, especially hooking thumbs." },
    { word: "hefty", definition: "Heavy, strong, vigorous, mighty, impressive." },
    { word: "noway", definition: "In no manner or degree; not at all; nowise; no way." },
    { word: "tangs", definition: "A refreshingly sharp aroma or flavor." },
    { word: "stoas", definition: "In Ancient Greece, a walkway with a roof supported by colonnades, often with a wall on one side; specifically, the Great Hall in Athens." },
    { word: "noun", definition: "(grammar, narrow sense) A word that can be used to refer to a person, animal, place, thing, phenomenon, substance, quality, or idea; one of the basic parts of speech in many languages, including English." },
    { word: "robs", definition: "To steal from, especially using force or violence." },
    { word: "bach", definition: "(northern) A holiday home, usually small and near the beach, often with only one or two rooms and of simple construction." },
    { word: "glues", definition: "A hard gelatin made by boiling bones and hides, used in solution as an adhesive; or any sticky adhesive substance." },
    { word: "jacal", definition: "A wattle-and-mud hut common in Mexico and the south-western US." },
    { word: "foils", definition: "A very thin sheet of metal." },
    { word: "shout", definition: "A loud burst of voice or voices; a violent and sudden outcry, especially that of a multitude expressing joy, triumph, exultation, anger, or animated courage." },
    { word: "term", definition: "That which limits the extent of anything; limit, extremity, bound, boundary." },
    { word: "harry", definition: "To plunder, pillage, assault." },
    { word: "filed", definition: "To commit (official papers) to some office." },
    { word: "loads", definition: "A burden; a weight to be carried." },
    { word: "woad", definition: "The plant Isatis tinctoria." },
    { word: "duty", definition: "That which one is morally or legally obligated to do." },
    { word: "frown", definition: "A facial expression in which the eyebrows are brought together, and the forehead is wrinkled, usually indicating displeasure, sadness or worry, or less often confusion or concentration." },
    { word: "unlet", definition: "(of property) Not let (not in temporary possession in return for rent)" },
    { word: "donee", definition: "Someone who receives a gift from a donor." },
    { word: "aisle", definition: "A wing of a building, notably in a church separated from the nave proper by piers." },
    { word: "mazy", definition: "Mazelike; like a maze." },
    { word: "purl", definition: "A particular stitch in knitting; an inversion of stitches giving the work a ribbed or waved appearance." },
    { word: "rate", definition: "The worth of something; value." },
    { word: "hams", definition: "The region back of the knee joint; the popliteal space; the hock." },
    { word: "mamma", definition: "The milk-secreting organ of female humans and other mammals which includes the mammary gland and the nipple or teat; a breast; an udder. (plural: mammae)" },
    { word: "curvy", definition: "Having curves." },
    { word: "kerns", definition: "A corn; grain; kernel." },
    { word: "chub", definition: "One of various species of freshwater fish of the Cyprinidae or carp family, especially:" },
    { word: "fibs", definition: "A lie, especially one that is more or less inconsequential." },
    { word: "foamy", definition: "An inexpensive surfboard made of extruded polystyrene foam" },
    { word: "desks", definition: "A table, frame, or case, in past centuries usually with a sloping top but now usually with a flat top, for the use of writers and readers. It often has a drawer or repository underneath." },
    { word: "cilia", definition: "Hairs or similar protrusions along the margin of a plant organ." },
    { word: "idiom", definition: "A manner of speaking, a mode of expression peculiar to a language, person, or group of people." },
    { word: "curls", definition: "A piece or lock of curling hair; a ringlet." },
    { word: "mats", definition: "A flat piece of coarse material used for wiping one’s feet, or as a decorative or protective floor covering." },
    { word: "vans", definition: "A covered vehicle used for carrying goods or people, usually roughly cuboid in shape, longer and higher than a car but smaller than a truck/lorry." },
    { word: "cyma", definition: "A moulding of the cornice, wavelike in form, whose outline consists of a concave and a convex line; an ogee." },
    { word: "types", definition: "A grouping based on shared characteristics; a class." },
    { word: "ceps", definition: "An edible mushroom (Boletus edulis)." },
    { word: "slyly", definition: "In a sly manner, cunningly." },
    { word: "begun", definition: "To start, to initiate or take the first step into something." },
    { word: "dandy", definition: "A man very concerned about his clothes and his appearance." },
    { word: "each", definition: "(operations) An individual item: the least quantitative unit in a grouping." },
    { word: "molt", definition: "The process of shedding or losing a covering of fur, feathers or skin etc." },
    { word: "shard", definition: "A piece of broken glass or pottery, especially one found in an archaeological dig." },
    { word: "drums", definition: "A percussive musical instrument spanned with a thin covering on at least one end for striking, forming an acoustic chamber, affecting what materials are used to make it; a membranophone." },
    { word: "ridge", definition: "The back of any animal; especially the upper or projecting part of the back of a quadruped." },
    { word: "leant", definition: "To incline, deviate, or bend, from a vertical position; to be in a position thus inclining or deviating." },
    { word: "fig", definition: "A fruit-bearing tree or shrub of the genus Ficus that is native mainly to the tropics." },
    { word: "valet", definition: "A man's personal male attendant, responsible for his clothes and appearance." },
    { word: "skein", definition: "A quantity of yarn, thread, or the like, put up together, after it is taken from the reel. A skein of cotton yarn is formed by eighty turns of the thread around a fifty-four inch reel." },
    { word: "songs", definition: "A musical composition with lyrics for voice or voices, performed by singing." },
    { word: "drub", definition: "Carbonaceous shale; small coal; slate, dross, or rubbish in coal." },
    { word: "saith", definition: "To pronounce." },
    { word: "vakil", definition: "A lawyer or advocate mainly a representative in the court of law and a vakil can be a representative, especially of a political figure; an official or ambassador." },
    { word: "asset", definition: "Something or someone of any value; any portion of one's property or effects so considered." },
    { word: "nappy", definition: "An absorbent garment worn by a baby who does not yet have voluntary control of his or her bladder and bowels or by someone who is incontinent; a diaper." },
    { word: "blink", definition: "The act of very quickly closing both eyes and opening them again." },
    { word: "rodes", definition: "The line from a vessel to its anchor." },
    { word: "daub", definition: "Excrement or clay used as a bonding material in construction." },
    { word: "lama", definition: "A master of Tibetan Buddhism." },
    { word: "intis", definition: "The currency of Peru between 1985 and 1991, replacing the sol." },
    { word: "syce", definition: "A groom, or servant with responsibility for the horses." },
    { word: "bema", definition: "A platform from which speakers addressed an assembly." },
    { word: "swan", definition: "Any of various species of large, long-necked waterfowl, of genus Cygnus (bird family: Anatidae), most of which have white plumage." },
    { word: "hots", definition: "(with up) To heat; to make or become hot." },
    { word: "psis", definition: "The twenty-third letter of Classical and Modern Greek and the twenty-fifth letter of Old and Ancient Greek." },
    { word: "tael", definition: "Any of several units of measure used in China and elsewhere in eastern Asia, approximately 40 grams." },
    { word: "stuns", definition: "The condition of being stunned." },
    { word: "ticks", definition: "A tiny woodland arachnid of the suborder Ixodida." },
    { word: "juga", definition: "One of the ridges commonly found on the fruit of umbelliferous plants." },
    { word: "amid", definition: "In the middle of; in the center of; surrounded by." },
    { word: "lists", definition: "A strip of fabric, especially from the edge of a piece of cloth." },
    { word: "gels", definition: "A semi-solid to almost solid colloid of a solid and a liquid, such as jelly, cheese or opal." },
    { word: "loaf", definition: "(also loaf of bread) A block of bread after baking." },
    { word: "infer", definition: "To introduce (something) as a reasoned conclusion; to conclude by reasoning or deduction, as from premises or evidence." },
    { word: "term", definition: "That which limits the extent of anything; limit, extremity, bound, boundary." },
    { word: "paw", definition: "The soft foot of a mammal or other animal, generally a quadruped, that has claws or nails; comparable to a human hand or foot." },
    { word: "tread", definition: "To step or walk (on or over something); to trample." },
    { word: "golf", definition: "A ball game played by individuals competing against one another in which the object is to hit a ball into each of a series of (usually 18 or nine) holes in the minimum number of strokes." },
    { word: "hake", definition: "A hook; a pot-hook." },
    { word: "chirr", definition: "The trilled sound made by an insect." },
    { word: "race", definition: "A contest between people, animals, vehicles, etc. where the goal is to be the first to reach some objective. Example: Several horses run in a horse race, and the first one to reach the finishing post wins" },
    { word: "scuzz", definition: "An unpleasant or disgusting (scuzzy) person" },
    { word: "assay", definition: "Trial, attempt." },
    { word: "woks", definition: "A large, oriental, round-bottomed cooking pan." },
    { word: "fond", definition: "To have a foolish affection for, to be fond of." },
    { word: "velar", definition: "A sound articulated at the soft palate" },
    { word: "rolls", definition: "The act or result of rolling, or state of being rolled." },
    { word: "stove", definition: "A heater, a closed apparatus to burn fuel for the warming of a room." },
    { word: "bossy", definition: "Tending to give orders to others, especially when unwarranted; domineering." },
    { word: "dewar", definition: "A vacuum flask; a vessel which keeps its contents hotter or cooler than their environment without the need to modify the pressure, by interposing an evacuated region to provide thermal insulation between the contents and the environment." },
    { word: "yoghs", definition: "A letter of the Middle English alphabet (capital Ȝ, small ȝ), in form derived from the Old English shape of the letter g, and used to represent various palatal and velar sounds." },
    { word: "lamer", definition: "Unable to walk properly because of a problem with one's feet or legs." },
    { word: "easel", definition: "An upright frame, typically on three legs, for displaying or supporting something, such as an artist's canvas." },
    { word: "sprit", definition: "A spar between mast and upper outer corner of a spritsail on sailing boats." },
    { word: "oidia", definition: "A fragile spore produced by some fungi." },
    { word: "stobs", definition: "A stick, twig or peg, especially in roofing or matting." },
    { word: "eh", definition: "To use the interjection eh" },
    { word: "mural", definition: "A large painting, usually drawn on a wall." },
    { word: "oval", definition: "An elongated round shape resembling an egg or ellipse." },
    { word: "zed", definition: "The name of the Latin-script letter Z." },
    { word: "arced", definition: "To move following a curved path." },
    { word: "milch", definition: "(of a cow, animal, etc.) Giving milk; in note" },
    { word: "jaws", definition: "One of the bones, usually bearing teeth, which form the framework of the mouth." },
    { word: "chads", definition: "(pickup community) A very handsome, usually tall, man whom women find sexually attractive; at times seen as an alpha male of a group." },
    { word: "deem", definition: "An opinion, a judgment, a surmise." },
    { word: "brats", definition: "A child who is regarded as mischievous, unruly, spoiled, or selfish." },
    { word: "fons", definition: "A fool or idiot." },
    { word: "roars", definition: "A long, loud, deep shout, as of rage or laughter, made with the mouth wide open." },
    { word: "tole", definition: "A decorative metalware having a lacquered or enamelled surface that is painted or gilded" },
    { word: "cries", definition: "A shedding of tears; the act of crying." },
    { word: "anon", definition: "Straight away; at once." },
    { word: "bones", definition: "A composite material consisting largely of calcium phosphate and collagen and making up the skeleton of most vertebrates." },
    { word: "bubba", definition: "Brother; used as term of familiar address." },
    { word: "limba", definition: "A large African tree, Terminalia superba, whose hard wood is used for furniture, table tennis paddles and musical instruments." },
    { word: "sonde", definition: "Probe; sound." },
    { word: "vicar", definition: "In the Church of England, the priest of a parish, receiving a salary or stipend but not tithes." },
    { word: "waspy", definition: "Resembling or characteristic of a wasp; wasplike." },
    { word: "prex", definition: "(college slang) A president, especially of a university." },
    { word: "croci", definition: "A perennial flowering plant (of the genus Crocus in the Iridaceae family). Saffron is obtained from the stamens of Crocus sativus." },
    { word: "puffy", definition: "Swollen or inflated in shape, as if filled with air; pillow-like." },
    { word: "tykes", definition: "A mongrel dog." },
    { word: "feral", definition: "A domesticated animal that has returned to the wild; an animal, particularly a domesticated animal, living independently of humans." },
    { word: "hosed", definition: "To water or spray with a hose." },
    { word: "cames", definition: "A grooved strip of lead used to hold panes of glass together." },
    { word: "ology", definition: "Any branch of learning, especially one ending in “-logy”." },
    { word: "beaux", definition: "A man with a reputation for fine dress and etiquette; a dandy or fop." },
    { word: "gable", definition: "The triangular area at the peak of an external wall adjacent to, and terminating, two sloped roof surfaces (pitches)." },
    { word: "body", definition: "Physical frame." },
    { word: "grigs", definition: "A dwarf." },
    { word: "nu", definition: "The letter of the Greek alphabet Ν and ν." },
    { word: "buffs", definition: "Undyed leather from the skin of buffalo or similar animals." },
    { word: "art", definition: "The conscious production or arrangement of sounds, colours, forms, movements, or other elements in a manner that affects the senses and emotions, usually specifically the production of the beautiful in a graphic or plastic medium." },
    { word: "owned", definition: "To have rightful possession of (property, goods or capital); to have legal title to." },
    { word: "spicy", definition: "Of, pertaining to, or containing spice." },
    { word: "xenon", definition: "The chemical element (symbol Xe) with an atomic number of 54. It is a colorless, odorless, unreactive noble gas, used notably in camera flash technology." },
    { word: "suint", definition: "A substance obtained from the wool of sheep, consisting largely of potash mixed with fatty and earthy matters." },
    { word: "taros", definition: "Colocasia esculenta, raised as a food primarily for its corm, which distantly resembles potato." },
    { word: "kif", definition: "A kind of cannabis smoked in Morocco and Algeria, for narcotic or intoxicating effect." },
    { word: "chute", definition: "A framework, trough or tube, upon or through which objects are made to slide from a higher to a lower level, or through which water passes to a wheel." },
    { word: "biz", definition: "Business." },
    { word: "keas", definition: "Nestor notabilis, a parrot of New Zealand." },
    { word: "meed", definition: "A payment or recompense made for services rendered or in recognition of some achievement; reward, deserts; award." },
    { word: "motto", definition: "A sentence, phrase, or word, forming part of an heraldic achievement." },
    { word: "pinks", definition: "The common minnow, Phoxinus phoxinus." },
    { word: "casks", definition: "A large barrel for the storage of liquid, especially of alcoholic drinks." },
    { word: "resat", definition: "To take an examination a second time." },
    { word: "harm", definition: "Physical injury; hurt; damage" },
    { word: "john", definition: "A prostitute's client." },
    { word: "flax", definition: "A plant of the genus Linum, especially Linum usitatissimum, which has a single, slender stalk, about a foot and a half high, with blue flowers. Also known as linseed, especially when referring to the seeds." },
    { word: "alee", definition: "On the lee side of a ship, to the leeward side (vs aweather)" },
    { word: "napes", definition: "The back part of the neck." },
    { word: "swan", definition: "Any of various species of large, long-necked waterfowl, of genus Cygnus (bird family: Anatidae), most of which have white plumage." },
    { word: "grid", definition: "A rectangular array of squares or rectangles of equal size, such as in a crossword puzzle." },
    { word: "area", definition: "A measure of the extent of a surface; it is measured in square units." },
    { word: "kikes", definition: "A Jew." },
    { word: "reaps", definition: "To cut (for example a grain) with a sickle, scythe, or reaping machine" },
    { word: "teloi", definition: "The aim or goal." },
    { word: "biros", definition: "A BIRO brand ballpoint pen." },
    { word: "leek", definition: "The vegetable Allium ampeloprasum var. porrum, having edible leaves and an onion-like bulb but with a milder flavour than the onion." },
    { word: "kicks", definition: "A hit or strike with the leg, foot or knee." },
    { word: "slued", definition: "Somewhat drunk; tipsy." },
    { word: "cyme", definition: "(spelt cime) A “head” (of unexpanded leaves, etc.); an opening bud." },
    { word: "doggy", definition: "A dog, especially a small one." },
    { word: "sash", definition: "A piece of cloth designed to be worn around the waist." },
    { word: "wuss", definition: "A weak, ineffectual, cowardly, or timid person." },
    { word: "calks", definition: "A pointed projection on a horseshoe to prevent it slipping." },
    { word: "kins", definition: "A day, in the Mesoamerican Long Count calendar." },
    { word: "routs", definition: "A noise, especially a loud one" },
    { word: "shame", definition: "Uncomfortable or painful feeling due to recognition or consciousness of one's own impropriety or dishonor or something being exposed that should have been kept private." },
    { word: "kabob", definition: "A dish of pieces of meat, fish, or vegetables roasted on a skewer or spit, especially a doner kebab." },
    { word: "tills", definition: "A cash register." },
    { word: "mows", definition: "A gull, seagull." },
    { word: "naval", definition: "Of or relating to a navy." },
    { word: "hilts", definition: "The handle of a sword, consisting of grip, guard, and pommel, designed to facilitate use of the blade and afford protection to the hand." },
    { word: "meds", definition: "(chiefly in the plural) Medications, especially prescribed psychoactive medications." },
    { word: "zonal", definition: "Divided into zones." },
    { word: "cadre", definition: "A frame or framework." },
    { word: "eats", definition: "To ingest; to be ingested." },
    { word: "heigh", definition: "An exclamation designed to call attention, give encouragement, etc." },
    { word: "leads", definition: "A heavy, pliable, inelastic metal element, having a bright, bluish color, but easily tarnished; both malleable and ductile, though with little tenacity. It is easily fusible, forms alloys with other metals, and is an ingredient of solder and type metal. Atomic number 82, symbol Pb (from Latin plumbum)." },
    { word: "penal", definition: "Of or relating to punishment." },
    { word: "oxy", definition: "The bivalent R-O-R functional group found in ethers." },
    { word: "imam", definition: "(usually capitalized) A Shi'ite Muslim leader." },
    { word: "cases", definition: "An actual event, situation, or fact." },
    { word: "bunny", definition: "A rabbit, especially a juvenile." },
    { word: "whins", definition: "Gorse; furze (Ulex spp.)." },
    { word: "alpha", definition: "The name of the first letter of the Greek alphabet (Α,  α), followed by beta. In the Latin alphabet it is the predecessor to A." },
    { word: "eel", definition: "Any freshwater or marine fish of the order Anguilliformes, which are elongated and resemble snakes." },
    { word: "slobs", definition: "A lazy and slovenly person." },
    { word: "lest", definition: "For fear that; that not; in order to prevent something from happening; in case." },
    { word: "world", definition: "(with 'the') Human collective existence; existence in general." },
    { word: "dears", definition: "A very kind, loving person." },
    { word: "nori", definition: "A type of seaweed, a red alga, laver (genus Pyropia, including species P. yezoensis and P. tenera)." },
    { word: "mushy", definition: "Resembling or having the consistency of mush; semiliquid, pasty, or granular." },
    { word: "vac", definition: "A vacation." },
    { word: "mezzo", definition: "Mezzo-soprano" },
    { word: "story", definition: "A sequence of real or fictional events; or, an account of such a sequence." },
    { word: "horsy", definition: "A child's term or name for a horse." },
    { word: "leafs", definition: "To produce leaves; put forth foliage." },
    { word: "booms", definition: "A low-pitched, resonant sound, such as of an explosion." },
    { word: "goy", definition: "A non-Jew, a gentile. (See usage notes)" },
    { word: "tubed", definition: "To supply with, or enclose in, a tube." },
    { word: "tipis", definition: "Alternative form of teepee" },
    { word: "major", definition: "A military rank between captain and lieutenant colonel." },
    { word: "melee", definition: "A battle fought at close range; hand-to-hand combat; brawling." },
    { word: "gray", definition: "An achromatic colour intermediate between black and white." },
    { word: "dewar", definition: "A vacuum flask; a vessel which keeps its contents hotter or cooler than their environment without the need to modify the pressure, by interposing an evacuated region to provide thermal insulation between the contents and the environment." },
    { word: "atoll", definition: "A type of island consisting of a ribbon reef that nearly or entirely surrounds a lagoon and supports, in most cases, one to many islets on the reef platform. Atolls have a unique geology, so not all islands with a reef and a lagoon are atolls" },
    { word: "suras", definition: "Any of the 114 chapters of the Qur'an." },
    { word: "zeds", definition: "The name of the Latin-script letter Z." },
    { word: "trash", definition: "Useless things to be discarded; rubbish; refuse." },
    { word: "swigs", definition: "Drink, liquor." },
    { word: "sett", definition: "To put (something) down, to rest." },
    { word: "hie", definition: "Haste; diligence." },
    { word: "bowed", definition: "To play music on (a stringed) instrument using a bow." },
    { word: "sirs", definition: "A man of a higher rank or position." },
    { word: "betel", definition: "Either of two plants often used in combination:" },
    { word: "yerks", definition: "To stab." },
    { word: "nabe", definition: "Neighborhood." },
    { word: "groin", definition: "The crease or depression of the human body at the junction of the trunk and the thigh, together with the surrounding region." },
    { word: "stark", definition: "Hard, firm; obdurate." },
    { word: "gauss", definition: "The unit of magnetic field strength in CGS systems of units, equal to 0.0001 tesla." },
    { word: "miss", definition: "A failure to hit." },
    { word: "shawm", definition: "A mediaeval double-reed wind instrument with a conical wooden body." },
    { word: "yond", definition: "Further; more distant" },
    { word: "man", definition: "An adult male human." },
    { word: "per", definition: "For each." },
    { word: "words", definition: "The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)" },
    { word: "covin", definition: "Fraud, deception." },
    { word: "rood", definition: "A crucifix, cross, especially in a church." },
    { word: "seton", definition: "A few silk threads or horsehairs, or a strip of linen etc., introduced beneath the skin by a knife or needle, so as to induce suppuration; also, the issue so formed." },
    { word: "jinni", definition: "(Muslim demonology) A genie and descendant of the jann, normally invisible to the human eye, but who may also appear in animal or human form, equivalent to demons in Jewish demonology." },
    { word: "ceiba", definition: "Any tree of the species in genus Ceiba" },
    { word: "sheet", definition: "A thin bed cloth used as a covering for a mattress or as a layer over the sleeper." },
    { word: "dif", definition: "Difference" },
    { word: "guide", definition: "Someone who guides, especially someone hired to show people around a place or an institution and offer information and explanation." },
    { word: "kemps", definition: "Coarse, rough hair, wool, or fur; (in the plural) knotty hairs that will not felt." },
    { word: "hyrax", definition: "Any of several small, paenungulate herbivorous mammals of the order Hyracoidea, with a bulky frame and fang-like incisors, native to Africa and the Middle East." },
    { word: "uric", definition: "Pertaining to, contained in, or obtained from urine." },
    { word: "bowls", definition: "A roughly hemispherical container used to hold, mix or present food, such as salad, fruit or soup, or other items." },
    { word: "poi", definition: "The traditional staple food of Hawaii, made by baking and pounding the kalo (or taro) root, and reducing it to a thin paste, which is allowed to ferment." },
    { word: "unfit", definition: "To make unfit; to render unsuitable, spoil, disqualify." },
    { word: "how", definition: "The means by which something is accomplished." },
    { word: "dead", definition: "(with 'the', a demonstrative, or a possessive) Those who have died." },
    { word: "incog", definition: "Incognito." },
    { word: "jolly", definition: "A pleasure trip or excursion." },
    { word: "hitch", definition: "A sudden pull." },
    { word: "hard", definition: "A firm or paved beach or slope convenient for hauling vessels out of the water." },
    { word: "liner", definition: "Someone who fits a lining to something." },
    { word: "scion", definition: "A descendant, especially a first-generation descendant of a distinguished family." },
    { word: "tory", definition: "(UK politics) A member or supporter of the Conservative Party, which evolved from Royalist politicians; historically associated with upholding the rights of the monarchy and the privileges of the established Church." },
    { word: "goody", definition: "A good character in a story, often a hero." },
    { word: "khaki", definition: "A dull, yellowish-brown colour, the colour of dust." },
    { word: "qi", definition: "The twenty-second letter of the Classical and Modern Greek alphabets." },
    { word: "deled", definition: "(usually imperative) to delete" },
    { word: "flaw", definition: "A flake, fragment, or shiver." },
    { word: "fuzzy", definition: "(often in the plural) A very small piece of plush material." },
    { word: "twill", definition: "A pattern, characterised by diagonal ridges, created by the regular interlacing of threads of the warp and weft during weaving." },
    { word: "spica", definition: "A spike." },
    { word: "cures", definition: "A method, device or medication that restores good health." },
    { word: "toed", definition: "(chiefly in combination) Having (a specified number or type of) toes." },
    { word: "bruin", definition: "A folk name for a bear, especially the brown bear, Ursus arctos." },
    { word: "wirra", definition: "Exclamation of dismay." },
    { word: "fuzz", definition: "A frizzy mass of hair or fibre." },
    { word: "upon", definition: "Being the target of an action." },
    { word: "fined", definition: "To make finer, purer, or cleaner; to purify or clarify." },
    { word: "wowed", definition: "To amaze or awe." },
    { word: "nomen", definition: "The name of a citizen of Ancient Rome, designating them as a member of a gens." },
    { word: "runt", definition: "The smallest animal of a litter." },
    { word: "lows", definition: "Something that is low; a low point." },
    { word: "pawns", definition: "A psychoactive preparation of betel leaf combined with areca nut and/or cured tobacco, chewed recreationally in Asia; such a preparation served wrapped in the leaf." },
    { word: "doze", definition: "A light, short sleep or nap." },
    { word: "biker", definition: "A person whose lifestyle is centered on motorcycles, sometimes a member of a motorcycle club." },
    { word: "pearl", definition: "A shelly concretion, usually rounded, and having a brilliant luster, with varying tints, found in the mantle, or between the mantle and shell, of certain bivalve mollusks, especially in the pearl oysters and river mussels, and sometimes in certain univalves. It is usually due to a secretion of shelly substance around some irritating foreign particle. Its substance is the same as nacre, or mother-of-pearl. Round lustrous pearls are used in jewellery." },
    { word: "shyer", definition: "Easily frightened; timid." },
    { word: "jism", definition: "Spirit or energy." },
    { word: "lodes", definition: "A way or path; a road." },
    { word: "neons", definition: "The chemical element (symbol Ne) with an atomic number of 10. The lightest of the noble gases, it is a colourless, odorless inert gas." },
    { word: "vela", definition: "A thin membrane, resembling a veil, such as:" },
    { word: "neem", definition: "Azadirachta indica, a large, mostly evergreen tree from India, whose seeds yield the insecticide azadirachtin." },
    { word: "leap", definition: "The act of leaping or jumping." },
    { word: "sear", definition: "Dry; withered, especially of vegetation." },
    { word: "bocci", definition: "A game, similar to bowls or pétanque, played on a long, narrow, dirt-covered court" },
    { word: "loofa", definition: "A tropical vine, of the genus Luffa, having almost cylindrical fruit with a spongy, fibrous interior; the dishcloth gourd" },
    { word: "rock", definition: "A formation of minerals, specifically:" },
    { word: "topi", definition: "An antelope of the species Damaliscus korrigum." },
    { word: "bogle", definition: "A goblin; a frightful spectre or phantom; a bogy or bugbear." },
    { word: "ay", definition: "Ah! alas!" },
    { word: "duple", definition: "Double." },
    { word: "megs", definition: "Any unit having the SI prefix mega-." },
    { word: "jeers", definition: "A mocking remark or reflection." },
    { word: "true", definition: "The state of being in alignment." },
    { word: "brat", definition: "A child who is regarded as mischievous, unruly, spoiled, or selfish." },
    { word: "kombu", definition: "Edible kelp (from the class Phaeophyceae) used in East Asian cuisine." },
    { word: "vids", definition: "Videotape" },
    { word: "corns", definition: "The main cereal plant grown for its grain in a given region, such as oats in parts of Scotland and Ireland, and wheat or barley in England and Wales." },
    { word: "wowed", definition: "To amaze or awe." },
    { word: "nook", definition: "A small corner formed by two walls; an alcove." },
    { word: "hubby", definition: "(term of endearment) Husband." },
    { word: "cukes", definition: "A cucumber." },
    { word: "elect", definition: "One chosen or set apart." },
    { word: "cigs", definition: "Cigarette" },
    { word: "dolce", definition: "A soft-toned organ stop." },
    { word: "boar", definition: "A wild boar (Sus scrofa), the wild ancestor of the domesticated pig." },
    { word: "unsay", definition: "To withdraw, retract (something said)." },
    { word: "butt", definition: "The larger or thicker end of something; the blunt end, in distinction from the sharp or narrow end" },
    { word: "slued", definition: "Somewhat drunk; tipsy." },
    { word: "raved", definition: "To wander in mind or intellect; to be delirious; to talk or act irrationally; to be wild, furious, or raging." },
    { word: "pips", definition: "Any of various respiratory diseases in birds, especially infectious coryza." },
    { word: "preys", definition: "To act as a predator." },
    { word: "foods", definition: "Any solid substance that can be consumed by living organisms, especially by eating, in order to sustain life." },
    { word: "reads", definition: "A reading or an act of reading, especially an actor's part of a play." },
    { word: "tapis", definition: "A tapestry." },
    { word: "saith", definition: "To pronounce." },
    { word: "wok", definition: "A large, oriental, round-bottomed cooking pan." },
    { word: "leek", definition: "The vegetable Allium ampeloprasum var. porrum, having edible leaves and an onion-like bulb but with a milder flavour than the onion." },
    { word: "tret", definition: "An allowance to purchasers, for waste or refuse matter, of four pounds on every 104 pounds of suttle weight, or weight after the tare is deducted." },
    { word: "kuna", definition: "The currency of Croatia, divided into 100 lipa" },
    { word: "hexad", definition: "A group of six." },
    { word: "gruel", definition: "A thin, watery porridge, formerly eaten primarily by the poor and the ill." },
    { word: "glute", definition: "(exercise) A gluteal muscle." },
    { word: "kempt", definition: "Neat and tidy; especially used of hair" },
    { word: "media", definition: "The middle layer of the wall of a blood vessel or lymph vessel which is composed of connective and muscular tissue." },
    { word: "groin", definition: "The crease or depression of the human body at the junction of the trunk and the thigh, together with the surrounding region." },
    { word: "soars", definition: "The act of soaring." },
    { word: "lysed", definition: "To burst or cut a cell or cell structure; to induce lysis." },
    { word: "lock", definition: "Something used for fastening, which can only be opened with a key or combination." },
    { word: "name", definition: "Any nounal word or phrase which indicates a particular person, place, class, or thing." },
    { word: "gilds", definition: "To cover with a thin layer of gold; to cover with gold leaf." },
    { word: "cams", definition: "A turning or sliding piece which imparts motion to a rod, lever or block brought into sliding or rolling contact with it." },
    { word: "oats", definition: "Widely cultivated cereal grass, typically Avena sativa." },
    { word: "yeh", definition: "Expressing joy, celebration, glee, etc." },
    { word: "pope", definition: "An honorary title of the Roman Catholic bishop of Rome as father and head of his church, a sovereign of the Vatican city state." },
    { word: "yawed", definition: "To turn about the vertical axis while maintaining course." },
    { word: "wats", definition: "A Buddhist temple in Southeast Asia." },
    { word: "fatwa", definition: "A legal opinion, decree or ruling issued by a mufti or other Islamic lawyer." },
    { word: "alto", definition: "A musical part or section higher than tenor and lower than soprano, formerly the part that performed a countermelody above the tenor or main melody." },
    { word: "biros", definition: "A BIRO brand ballpoint pen." },
    { word: "area", definition: "A measure of the extent of a surface; it is measured in square units." },
    { word: "gib", definition: "A bolt or wedge made from wood or metal used for holding a machine part in place." },
    { word: "cup", definition: "A concave vessel for drinking from, usually made of opaque material (as opposed to a glass) and with a handle." },
    { word: "purls", definition: "A particular stitch in knitting; an inversion of stitches giving the work a ribbed or waved appearance." },
    { word: "zeds", definition: "The name of the Latin-script letter Z." },
    { word: "trick", definition: "Something designed to fool or swindle." },
    { word: "gad", definition: "An exclamatory interjection roughly equivalent to by God, goodness gracious, for goodness' sake." },
    { word: "hots", definition: "(with up) To heat; to make or become hot." },
    { word: "amnio", definition: "Amniocentesis" },
    { word: "pond", definition: "An inland body of standing water, either natural or man-made, that is smaller than a lake." },
    { word: "paise", definition: "A subdivision of currency, equal to one hundredth of a rupee in various Asian countries." },
    { word: "man", definition: "An adult male human." },
    { word: "fine", definition: "Fine champagne; French brandy." },
    { word: "rebel", definition: "A person who resists an established authority, often violently" },
    { word: "helps", definition: "Action given to provide assistance; aid." },
    { word: "blink", definition: "The act of very quickly closing both eyes and opening them again." },
    { word: "biker", definition: "A person whose lifestyle is centered on motorcycles, sometimes a member of a motorcycle club." },
    { word: "snick", definition: "A small deflection of the ball off the side of the bat; often carries to the wicketkeeper for a catch" },
    { word: "stack", definition: "(heading) A pile." },
    { word: "plonk", definition: "The sound of something solid landing." },
    { word: "phial", definition: "A glass vessel or bottle, especially a small bottle for medicines." },
    { word: "mend", definition: "A place, as in clothing, which has been repaired by mending." },
    { word: "piton", definition: "A spike, wedge, or peg that is driven into a rock or ice surface as a support (as for a mountain climber)." },
    { word: "lemon", definition: "A yellowish citrus fruit." },
    { word: "nori", definition: "A type of seaweed, a red alga, laver (genus Pyropia, including species P. yezoensis and P. tenera)." },
    { word: "shale", definition: "A shell or husk; a cod or pod." },
    { word: "alto", definition: "A musical part or section higher than tenor and lower than soprano, formerly the part that performed a countermelody above the tenor or main melody." },
    { word: "aqua", definition: "The compound water." },
    { word: "flump", definition: "The dull sound so produced." },
    { word: "oidia", definition: "A fragile spore produced by some fungi." },
    { word: "barf", definition: "Vomit" },
    { word: "mend", definition: "A place, as in clothing, which has been repaired by mending." },
    { word: "roams", definition: "To wander or travel freely and with no specific destination." },
    { word: "gated", definition: "To keep something inside by means of a closed gate." },
    { word: "doped", definition: "To affect with drugs." },
    { word: "ruled", definition: "To regulate, be in charge of, make decisions for, reign over." },
    { word: "skelp", definition: "A blow; a smart stroke." },
    { word: "apt", definition: "Suitable; appropriate; fit or fitted; suited." },
    { word: "titer", definition: "The concentration of a substance as determined by titration." },
    { word: "wedge", definition: "One of the simple machines; a piece of material, such as metal or wood, thick at one edge and tapered to a thin edge at the other for insertion in a narrow crevice, used for splitting, tightening, securing, or levering." },
    { word: "ethic", definition: "A set of principles of right and wrong behaviour guiding, or representative of, a specific culture, society, group, or individual." },
    { word: "roux", definition: "A mixture of fat (usually butter) and flour used to thicken sauces and stews." },
    { word: "numen", definition: "A divinity, especially a local or presiding god." },
    { word: "stilt", definition: "Either of two poles with footrests that allow someone to stand or walk above the ground; used mostly by entertainers." },
    { word: "nappy", definition: "An absorbent garment worn by a baby who does not yet have voluntary control of his or her bladder and bowels or by someone who is incontinent; a diaper." },
    { word: "umiak", definition: "A large, open boat made of skins stretched over a wooden frame that is propelled by paddles; used by the Eskimos for transportation." },
    { word: "locks", definition: "Something used for fastening, which can only be opened with a key or combination." },
    { word: "gelds", definition: "Money." },
    { word: "squab", definition: "(sometimes attributive) A baby pigeon, dove, or chicken." },
    { word: "fiend", definition: "A devil or demon; a malignant or diabolical being; an evil spirit." },
    { word: "bless", definition: "To make something holy by religious rite, sanctify." },
    { word: "leaks", definition: "A crack, crevice, fissure, or hole which admits water or other fluid, or lets it escape." },
    { word: "codex", definition: "An early manuscript book." },
    { word: "dig", definition: "An archeological or paleontological investigation, or the site where such an investigation is taking place." },
    { word: "pekan", definition: "The fisher cat, the fisher (Martes pennanti), or the marten (Martes americana)." },
    { word: "tired", definition: "To become sleepy or weary." },
    { word: "noils", definition: "A short fibre left over from combing wool or spinning silk during the preparation of textile yarns. Sometimes it is referred to as 'Raw Silk', although this is somewhat of a misnomer." },
    { word: "weld", definition: "A herb (Reseda luteola) related to mignonette, growing in Europe, and to some extent in America, used to make a yellow dye." },
    { word: "macer", definition: "A mace bearer; specifically, an officer of a court in Scotland." },
    { word: "genua", definition: "Knee" },
    { word: "spilt", definition: "To drop something so that it spreads out or makes a mess; to accidentally pour." },
    { word: "work", definition: "(heading) Employment." },
    { word: "slug", definition: "Any of many terrestrial pulmonate gastropod mollusks, having no (or only a rudimentary) shell." },
    { word: "chub", definition: "One of various species of freshwater fish of the Cyprinidae or carp family, especially:" },
    { word: "gybed", definition: "To shift a fore-and-aft sail from one side of a sailing vessel to the other, while sailing before the wind." },
    { word: "pois", definition: "A small ball made of leaves and fibres, attached to a string; also, a traditional dance performed by Maori women involving the rhythmic swinging of such a ball." },
    { word: "birds", definition: "A member of the class of animals Aves in the phylum Chordata, characterized by being warm-blooded, having feathers and wings usually capable of flight, and laying eggs." },
    { word: "serow", definition: "Any of several species of Asian ungulates of the genus Capricornis." },
    { word: "linn", definition: "A pool of water, especially one below a waterfall." },
    { word: "fens", definition: "A type of wetland fed by ground water and runoff, containing peat below the waterline, characteristically alkaline." },
    { word: "prowl", definition: "The act of prowling." },
    { word: "warns", definition: "To make (someone) aware of (something impending); especially:" },
    { word: "ward", definition: "A warden; a guard; a guardian or watchman." },
    { word: "spurt", definition: "A brief gush, as of liquid spurting from an orifice or a cut/wound." },
    { word: "sarky", definition: "Sarcastic" },
    { word: "peck", definition: "An act of striking with a beak." },
    { word: "grody", definition: "Nasty, dirty, disgusting, foul, revolting, yucky, grotesque." },
    { word: "roods", definition: "A crucifix, cross, especially in a church." },
    { word: "plays", definition: "Activity for amusement only, especially among the young." },
    { word: "gid", definition: "A disease of sheep caused by tapeworm." },
    { word: "ceded", definition: "To give up; yield to another." },
    { word: "joule", definition: "In the International System of Units, the derived unit of energy, work and heat; the work required to exert a force of one newton for a distance of one metre. Also equal to the energy of one watt of power for a duration of one second. Symbol: J" },
    { word: "magic", definition: "The application of rituals or actions, especially those based on occult knowledge, to subdue or manipulate natural or supernatural beings and forces in order to have some benefit from them" },
    { word: "forms", definition: "(heading, physical) To do with shape." },
    { word: "rind", definition: "Tree bark" },
    { word: "ratty", definition: "Similar to a rat; ratlike." },
    { word: "teem", definition: "To be stocked to overflowing." },
    { word: "poof", definition: "The product of flatulence, or the sound of breaking wind." },
    { word: "clept", definition: "To give a call; cry out; appeal." },
    { word: "jobs", definition: "A task." },
    { word: "swiss", definition: "To prepare (meat, fabric, etc.) by rolling or pounding in order to soften it." },
    { word: "pseud", definition: "An intellectually pretentious person; a poseur" },
    { word: "crepe", definition: "A flat round pancake-like pastry from Lower Brittany, made with wheat." },
    { word: "tame", definition: "To make (an animal) tame; to domesticate." },
    { word: "wag", definition: "An oscillating movement." },
    { word: "spin", definition: "Rapid circular motion." },
    { word: "hake", definition: "A hook; a pot-hook." },
    { word: "lest", definition: "For fear that; that not; in order to prevent something from happening; in case." },
    { word: "wells", definition: "A hole sunk into the ground as a source of water, oil, natural gas or other fluids." },
    { word: "flout", definition: "The act by which something is flouted; violation of a law." },
    { word: "nenes", definition: "The Hawaiian goose, Branta sandvicensis, which was designated the state bird of Hawaii in 1957." },
    { word: "smug", definition: "To make smug, or spruce." },
    { word: "lunk", definition: "A fool; an idiot; a lunkhead." },
    { word: "poori", definition: "A type of unleavened bread from Indian and Pakistan." },
    { word: "didst", definition: "(auxiliary) A syntactic marker." },
    { word: "rowen", definition: "A second crop of hay; aftermath." },
    { word: "fur", definition: "The hairy coat of various mammal species, especially when fine, soft and thick." },
    { word: "only", definition: "An only child." },
    { word: "sue", definition: "To file a legal action against someone, generally a non-criminal action." },
    { word: "snows", definition: "The frozen, crystalline state of water that falls as precipitation." },
    { word: "kroon", definition: "The former currency of Estonia, divided into 100 senti" },
    { word: "lever", definition: "(except in generalized senses below) A crowbar." },
    { word: "toot", definition: "The noise of a horn or whistle." },
    { word: "bap", definition: "A soft bread roll, originally from Scotland." },
    { word: "braze", definition: "A kind of small charcoal used for roasting ore." },
    { word: "act", definition: "Something done, a deed." },
    { word: "recap", definition: "A tire that has had new tread glued on." },
    { word: "fling", definition: "An act of throwing, often violently." },
    { word: "zone", definition: "Each of the five regions of the earth's surface into which it was divided by climatic differences, namely the torrid zone (between the tropics), two temperate zones (between the tropics and the polar circles), and two frigid zones (within the polar circles)." },
    { word: "cots", definition: "A simple bed, especially one for portable or temporary purposes." },
    { word: "gutty", definition: "Charged or sprinkled with drops." },
    { word: "gibed", definition: "Alternative spelling of gybe" },
    { word: "wally", definition: "To estimate the value of; judge the worth of something." },
    { word: "elope", definition: "(of a married person) To run away from home with a paramour." },
    { word: "semi", definition: "A semi-detached house." },
    { word: "skoal", definition: "To make such a toast." },
    { word: "pulik", definition: "One of a breed of Hungarian sheepdog with a distinctive thick, corded coat." },
    { word: "orcin", definition: "The organic compound 3,5-dihydroxytoluene, found in many lichens and synthesizable from toluene." },
    { word: "renew", definition: "To make (something) new again; to restore to freshness or original condition." },
    { word: "pewit", definition: "Any of several birds" },
    { word: "wages", definition: "(often in plural) An amount of money paid to a worker for a specified quantity of work, usually calculated on an hourly basis and expressed in an amount of money per hour." },
    { word: "pant", definition: "A quick breathing; a catching of the breath; a gasp." },
    { word: "dweeb", definition: "(originally college slang) A boring, studious, or socially inept person." },
    { word: "rebid", definition: "A second or subsequent (normally higher) bid." },
    { word: "teeny", definition: "Very small; tiny." },
    { word: "stilt", definition: "Either of two poles with footrests that allow someone to stand or walk above the ground; used mostly by entertainers." },
    { word: "unset", definition: "To make not set." },
    { word: "mache", definition: "Valerianella locusta, a small dicot annual plant of the family Caprifoliaceae often cultivated as a salad green or herb." },
    { word: "eek", definition: "To produce a high-pitched squeal, as in fear or trepidation." },
    { word: "roups", definition: "An outcry." },
    { word: "dyer", definition: "One who dyes, especially one who dyes cloth etc. as an occupation." },
    { word: "ilium", definition: "The upper and widest of the three bones that make up each side of the hipbone and pelvis." },
    { word: "suk", definition: "A street market, particularly in Arabic- and Somali-speaking countries; a place where people buy and sell goods." },
    { word: "pokey", definition: "(with 'the') prison." },
    { word: "pees", definition: "Urine." },
    { word: "soaps", definition: "A substance able to mix with both oil and water, used for cleaning, often in the form of a solid bar or in liquid form, derived from fats or made synthetically." },
    { word: "zappy", definition: "Lively or energetic." },
    { word: "cob", definition: "A male swan." },
    { word: "truss", definition: "A bandage and belt used to hold a hernia in place." },
    { word: "sakis", definition: "An alcoholic beverage made from fermenting various forms of rice, usually with an ABV similar to wine." },
    { word: "feta", definition: "A variety of curd cheese made from sheep’s or goat’s milk and originating from Greece." },
    { word: "galah", definition: "A pink and grey species of cockatoo, Eolophus roseicapilla, native to Australia." },
    { word: "paled", definition: "To turn pale; to lose colour." },
    { word: "loath", definition: "Averse, disinclined; reluctant, unwilling." },
    { word: "ortho", definition: "An isomer of a benzene derivative having two substituents adjacent on the ring." },
    { word: "scurf", definition: "A skin disease." },
    { word: "riots", definition: "Wanton or unrestrained behavior; uproar; tumult." },
    { word: "plie", definition: "A smooth and continuous bending of the knees" },
    { word: "manat", definition: "The basic unit of currency for Azerbaijan; symbol ₼; subdivided into 100 qapik." },
    { word: "lops", definition: "That which is lopped from anything, such as branches from a tree." },
    { word: "secs", definition: "Second, 1/60 of a minute." },
    { word: "pooh", definition: "Feces." },
    { word: "too", definition: "(focus) Likewise." },
    { word: "shrub", definition: "A woody plant smaller than a tree, and usually with several stems from the same base." },
    { word: "logs", definition: "The trunk of a dead tree, cleared of branches." },
    { word: "bugs", definition: "An insect of the order Hemiptera (the “true bugs”)." },
    { word: "fort", definition: "A fortified defensive structure stationed with troops." },
    { word: "wonk", definition: "An overly studious person, particularly student." },
    { word: "filed", definition: "To commit (official papers) to some office." },
    { word: "sabra", definition: "A native-born Israeli." },
    { word: "gonif", definition: "A thief; a rascal or scoundrel." },
    { word: "purr", definition: "The vibrating sound made by a cat in its throat when contented." },
    { word: "tilde", definition: "The grapheme of character ~." },
    { word: "tops", definition: "The highest or uppermost part of something." },
    { word: "dulse", definition: "A seaweed of a reddish-brown color (Palmaria palmata) which is sometimes eaten, as in Scotland." },
    { word: "bombe", definition: "A dessert made from ice cream frozen in a (generally spherical or hemispherical) mold." },
    { word: "taco", definition: "A Mexican snack food; a small tortilla (soft or hard shelled), with typically some type of meat, rice, beans, cheese, diced vegetables (usually tomatoes and lettuce, as served in the United States, and cilantro, onion, and avocado, as served in México) and salsa." },
    { word: "blend", definition: "A mixture of two or more things." },
    { word: "cyma", definition: "A moulding of the cornice, wavelike in form, whose outline consists of a concave and a convex line; an ogee." },
    { word: "girts", definition: "A horizontal structural member of post and beam architecture, typically attached to bridge two or more vertical members such as corner posts." },
    { word: "gloms", definition: "To steal, to grab." },
    { word: "homie", definition: "Someone, particularly a friend or male acquaintance, from one's hometown." },
    { word: "odes", definition: "A short poetical composition proper to be set to music or sung; a lyric poem; especially, now, a poem characterized by sustained noble sentiment and appropriate dignity of style." },
    { word: "plump", definition: "To grow plump; to swell out." },
    { word: "eyras", definition: "A slender, reddish-yellow wild cat (Puma yagouaroundi eyra) ranging from southern Brazil to Texas." },
    { word: "vague", definition: "A wandering; a vagary." },
    { word: "ice", definition: "Water in frozen (solid) form." },
    { word: "delay", definition: "A period of time before an event occurs; the act of delaying; procrastination; lingering inactivity." },
    { word: "heat", definition: "Thermal energy." },
    { word: "tore", definition: "Hard, difficult; wearisome, tedious." },
    { word: "lobby", definition: "An entryway or reception area; vestibule; passageway; corridor." },
    { word: "per", definition: "For each." },
    { word: "awful", definition: "Very bad." },
    { word: "tease", definition: "One who teases." },
    { word: "blued", definition: "To make or become blue." },
    { word: "aped", definition: "To behave like an ape." },
    { word: "crop", definition: "A plant, especially a cereal, grown to be harvested as food, livestock fodder or fuel or for any other economic purpose." },
    { word: "fetid", definition: "The foul-smelling asafoetida plant, or its extracts." },
    { word: "dart", definition: "A pointed missile weapon, intended to be thrown by the hand, for example a short lance or javelin" },
    { word: "big", definition: "Someone or something that is large in stature" },
    { word: "golly", definition: "God!" },
    { word: "mash", definition: "A mass of mixed ingredients reduced to a soft pulpy state by beating or pressure; a mass of anything in a soft pulpy state." },
    { word: "nevi", definition: "Any of a number of different, usually benign, pigmented, raised or otherwise abnormal lesions of the skin." },
    { word: "musty", definition: "Having a stale odor." },
    { word: "dads", definition: "A father, a male parent." },
    { word: "doze", definition: "A light, short sleep or nap." },
    { word: "it", definition: "One who is neither a he nor a she; a creature; a dehumanized being." },
    { word: "terai", definition: "A belt of marshy land, which lies between the foothills of the Himalayas and the plains." },
    { word: "loess", definition: "Any sediment, dominated by silt, of eolian (wind-blown) origin" },
    { word: "anger", definition: "A strong feeling of displeasure, hostility or antagonism towards someone or something, usually combined with an urge to harm." },
    { word: "note", definition: "(heading) A symbol or annotation." },
    { word: "ragas", definition: "Any of various melodic forms used in Indian classical music, or a piece of music composed in such a form." },
    { word: "croc", definition: "A crocodile." },
    { word: "site", definition: "Sorrow, grief." },
    { word: "freed", definition: "To make free; set at liberty; release." },
    { word: "lorry", definition: "A motor vehicle for transporting goods, and in some cases people; a truck." },
    { word: "azan", definition: "The call to prayer, which originally consisted of simply four takbirs followed by the statement لَا إِلٰهَ إِلَّا ٱلله (أَشْهَدُ أَنْ)." },
    { word: "sum", definition: "A quantity obtained by addition or aggregation." },
    { word: "flora", definition: "Plants considered as a group, especially those of a particular country, region, time, etc." },
    { word: "clays", definition: "A mineral substance made up of small crystals of silica and alumina, that is ductile when moist; the material of pre-fired ceramics." },
    { word: "inkle", definition: "To hint at; disclose." },
    { word: "dyer", definition: "One who dyes, especially one who dyes cloth etc. as an occupation." },
    { word: "mix", definition: "To stir together." },
    { word: "oinks", definition: "The sound made by a pig, or an imitation thereof." },
    { word: "peavy", definition: "A tool used to manipulate logs, having a thick wooden handle, a steel point, and a curved hooked arm. Similar to a cant-hook, but shorter and stouter, and with a pointed end." },
    { word: "intro", definition: "An introduction." },
    { word: "wile", definition: "To pass (time) idly." },
    { word: "cutup", definition: "Someone who cuts up; someone who acts boisterously or clownishly, for example, by playing practical jokes." },
    { word: "barge", definition: "A large flat-bottomed towed or self-propelled boat used mainly for river and canal transport of heavy goods or bulk cargo." },
    { word: "brims", definition: "The sea; ocean; water; flood." },
    { word: "dowry", definition: "Payment, such as property or money, paid by the bride's family to the groom or his family at the time of marriage." },
    { word: "plat", definition: "A plot of land; a lot." },
    { word: "arras", definition: "A tapestry or wall hanging." },
    { word: "troll", definition: "A supernatural being of varying size, now especially a grotesque humanoid creature living in caves or hills or under bridges." },
    { word: "yawn", definition: "The action of yawning; opening the mouth widely and taking a long, rather deep breath, often because one is tired or bored." },
    { word: "bogie", definition: "One who robs others in a lawless area, especially as part of a group." },
    { word: "coho", definition: "An anadromus and semelparous salmon, Oncorhynchus kisutch, found in the coastal regions of the northern Pacific Ocean, used as a symbol by several Native American tribes." },
    { word: "summa", definition: "A comprehensive summary of, or treatise on a subject, especially theology or philosophy." },
    { word: "panes", definition: "An individual sheet of glass in a window, door, etc." },
    { word: "playa", definition: "A level area which habitually fills with water that evaporates entirely." },
    { word: "lint", definition: "A fine material made by scraping cotton or linen cloth; used for dressing wounds." },
    { word: "atria", definition: "A central room or space in ancient Roman homes, open to the sky in the middle; a similar space in other buildings." },
    { word: "fair", definition: "Something which is fair (in various senses of the adjective)." },
    { word: "aged", definition: "To cause to grow old; to impart the characteristics of age to." },
    { word: "bole", definition: "The trunk or stem of a tree." },
    { word: "bam", definition: "Representing a loud noise or heavy impact." },
    { word: "chops", definition: "A cut of meat, often containing a section of a rib." },
    { word: "trays", definition: "A small, typically rectangular or round, flat, and rigid object upon which things are carried." },
    { word: "mage", definition: "A magician, wizard or sorcerer." },
    { word: "quern", definition: "A mill for grinding corn, especially a hand-mill made of two circular stones." },
    { word: "tames", definition: "To make (an animal) tame; to domesticate." },
    { word: "mossy", definition: "Mosquito" },
    { word: "deter", definition: "To prevent something from happening." },
    { word: "biogs", definition: "A biography." },
    { word: "rajas", definition: "A Hindu prince or ruler in India." },
    { word: "scowl", definition: "The wrinkling of the brows or face in frowning; the expression of displeasure, sullenness, or discontent in the countenance; an angry frown." },
    { word: "tees", definition: "The name of the Latin-script letter T." },
    { word: "shady", definition: "Abounding in shades." },
    { word: "lungs", definition: "A biological organ of vertebrates that controls breathing and oxygenates the blood." },
    { word: "latch", definition: "To close or lock as if with a latch." },
    { word: "krona", definition: "The official currency of Sweden." },
    { word: "soras", definition: "A rail (Porzana carolina) of North, Central, and northern South America." },
    { word: "colds", definition: "A condition of low temperature." },
    { word: "zineb", definition: "An organic fungicide and insecticide sprayed on cereal grasses, fruit trees, etc." },
    { word: "mode", definition: "One of several ancient Greek scales." },
    { word: "bog", definition: "An area of decayed vegetation (particularly sphagnum moss) which forms a wet spongy ground too soft for walking; a marsh or swamp." },
    { word: "merls", definition: "The Eurasian blackbird, Turdus merula." },
    { word: "issue", definition: "The action or an instance of flowing or coming out, an outflow, particularly:" },
    { word: "miffs", definition: "A small argument; a quarrel." },
    { word: "reply", definition: "A written or spoken response; part of a conversation." },
    { word: "dewy", definition: "Covered by dew." },
    { word: "ducks", definition: "To quickly lower the head or body in order to prevent it from being struck by something." },
    { word: "bigot", definition: "One who is narrow-mindedly devoted to one's own ideas and groups, and intolerant of (people of) differing ideas, races, genders, religions, politics, etc." },
    { word: "spivs", definition: "A smartly dressed person who trades in illicit, black-market or stolen goods." },
    { word: "label", definition: "A small ticket or sign giving information about something to which it is attached or intended to be attached." },
    { word: "hills", definition: "An elevated location smaller than a mountain." },
    { word: "hum", definition: "Indicating thinking or pondering." },
    { word: "gobs", definition: "A lump of soft or sticky material." },
    { word: "stage", definition: "A phase." },
    { word: "worst", definition: "Unfavorable; negative; not good." },
    { word: "seder", definition: "The ceremonial meal held on the first night or two nights of Passover." },
    { word: "idem", definition: "The same." },
    { word: "mafic", definition: "A rock with such properties." },
    { word: "rosin", definition: "A solid form of resin, obtained from liquid resin by vaporizing its volatile components." },
    { word: "oral", definition: "A spoken test or examination, particularly in a language class." },
    { word: "stoop", definition: "The staircase and landing or porch leading to the entrance of a residence." },
    { word: "whomp", definition: "Hit extremely hard." },
    { word: "tommy", definition: "Bread, generally a penny roll; the supply of food carried by workmen as their daily allowance" },
    { word: "piety", definition: "Reverence and devotion to God." },
    { word: "rids", definition: "To free (something) from a hindrance or annoyance." },
    { word: "aphis", definition: "An aphid." },
    { word: "lycra", definition: "A type of synthetic elastic fabric and fibre (spandex) used for tight-fitting garments, such as swimming costumes." },
    { word: "deli", definition: "A shop that sells cooked or prepared food ready for serving." },
    { word: "frats", definition: "Shortened form for fraternity, college organization. (Often used as a noun modifier.)" },
    { word: "flesh", definition: "The soft tissue of the body, especially muscle and fat." },
    { word: "dyne", definition: "A unit of force in the CGS system; the force required to accelerate a mass of one gram by one centimetre per second per second. Symbol: dyn." },
    { word: "dolma", definition: "Any of a family of stuffed vegetable dishes. The filling generally consists of rice, minced meat or grains, together with onion, herbs and spices." },
    { word: "sexts", definition: "Noon, reckoned as the sixth hour of daylight." },
    { word: "riser", definition: "Someone or something which rises." },
    { word: "dad", definition: "A father, a male parent." },
    { word: "stuff", definition: "Miscellaneous items or objects; (with possessive) personal effects." },
    { word: "frows", definition: "A cleaving tool for splitting cask staves and shingles from the block." },
    { word: "monad", definition: "An ultimate atom, or simple, unextended point; something ultimate and indivisible." },
    { word: "whins", definition: "Gorse; furze (Ulex spp.)." },
    { word: "tied", definition: "To twist (a string, rope, or the like) around itself securely." },
    { word: "oddly", definition: "In a peculiar manner; strangely; unusually." },
    { word: "stalk", definition: "The stem or main axis of a plant, which supports the seed-carrying parts." },
    { word: "yoni", definition: "The vulva or vagina, or a symbol of them, especially as an object of veneration within certain types of Hinduism, Buddhism, and other cultures." },
    { word: "mixer", definition: "One who, or a device that, mixes or merges things together." },
    { word: "cups", definition: "A concave vessel for drinking from, usually made of opaque material (as opposed to a glass) and with a handle." },
    { word: "peavy", definition: "A tool used to manipulate logs, having a thick wooden handle, a steel point, and a curved hooked arm. Similar to a cant-hook, but shorter and stouter, and with a pointed end." },
    { word: "guano", definition: "Dung from a sea bird or from a bat." },
    { word: "botel", definition: "A floating hotel; a boat that acts as a hotel" },
    { word: "pucks", definition: "A mischievous or hostile spirit." },
    { word: "flow", definition: "A movement in people or things with a particular way in large numbers or amounts" },
    { word: "truer", definition: "(of a statement) Conforming to the actual state of reality or fact; factually correct." },
    { word: "tophi", definition: "A deposit of monosodium urate crystals in the body, caused by high levels of uric acid in the blood." },
    { word: "pisco", definition: "A liquor distilled from grapes (a brandy) made in wine-producing regions of Peru and Chile. It is the most widely consumed spirit in Argentina, Bolivia, Chile and Peru." },
    { word: "mutes", definition: "A stopped consonant; a stop." },
    { word: "potto", definition: "A small primate, Perodicticus potto, native to the tropical rainforests of Africa." },
    { word: "dumka", definition: "A genre of instrumental folk music from Ukraine." },
    { word: "cysts", definition: "A pouch or sac without opening, usually membranous and containing morbid matter, which develops in one of the natural cavities or in the substance of an organ." },
    { word: "boar", definition: "A wild boar (Sus scrofa), the wild ancestor of the domesticated pig." },
    { word: "jut", definition: "Something that sticks out." },
    { word: "grift", definition: "A confidence game or swindle." },
    { word: "coots", definition: "Any of various aquatic birds of the genus Fulica that are mainly black with a prominent frontal shield on the forehead." },
    { word: "nomen", definition: "The name of a citizen of Ancient Rome, designating them as a member of a gens." },
    { word: "quite", definition: "(heading) To the greatest extent or degree; completely, entirely." },
    { word: "askew", definition: "Turned or twisted to one side." },
    { word: "naked", definition: "Bare, not covered by clothing." },
    { word: "lag", definition: "A gap, a delay; an interval created by something not keeping up; a latency." },
    { word: "vary", definition: "Alteration; change." },
    { word: "tame", definition: "To make (an animal) tame; to domesticate." },
    { word: "putty", definition: "A form of cement, made from linseed oil and whiting, used to fix panes of glass." },
    { word: "nerdy", definition: "(of a person) Being or like a nerd." },
    { word: "puma", definition: "The mountain lion or cougar, Puma concolor." },
    { word: "zeal", definition: "The fervour or tireless devotion for a person, cause, or ideal and determination in its furtherance; diligent enthusiasm; powerful interest." },
    { word: "cost", definition: "To incur a charge of; to require payment of a (specified) price." },
    { word: "marl", definition: "A mixed earthy substance, consisting of carbonate of lime, clay, and possibly sand, in very variable proportions, and accordingly designated as calcareous, clayey, or sandy." },
    { word: "harts", definition: "A male deer, especially the male of the red deer after his fifth year." },
    { word: "qubit", definition: "A quantum bit; the basic unit of quantum information described by a superposition of two states; a quantum bit in a quantum computer capable of being in a state of superposition." },
    { word: "idler", definition: "One who idles; one who spends his or her time in inaction." },
    { word: "moots", definition: "A moot court." },
    { word: "here", definition: "(abstract) This place; this location." },
    { word: "prole", definition: "A member of the proletariat; a proletarian" },
    { word: "jebel", definition: "A hill, a mountain (especially in the Middle East or North Africa)." },
    { word: "buts", definition: "An instance or example of using the word 'but'." },
    { word: "cols", definition: "A dip on a mountain ridge between two peaks." },
    { word: "lexis", definition: "The set of all words and phrases in a language; any unified subset of words from a particular language." },
    { word: "laird", definition: "The owner of a Scottish estate; a member of the landed gentry, a landowner." },
    { word: "dweeb", definition: "(originally college slang) A boring, studious, or socially inept person." },
    { word: "titer", definition: "The concentration of a substance as determined by titration." },
    { word: "wreak", definition: "To cause something harmful; to afflict; to inflict; to harm or injury; to let out something harmful; ." },
    { word: "tabby", definition: "A kind of waved silk, usually called watered silk, manufactured like taffeta, but thicker and stronger. The watering is given to it by calendering." },
    { word: "mos", definition: "Singular of mores" },
    { word: "genet", definition: "Any of several Old World nocturnal, carnivorous mammals, of the genus Genetta in the family Viverridae, most of which have a spotted coat and a long, ringed tail." },
    { word: "prof", definition: "The most senior rank for an academic at a university or similar institution, informally also known as 'full professor.' Abbreviated Prof." },
    { word: "uncap", definition: "To remove a cap or cover from." },
    { word: "where", definition: "The place in which something happens." },
    { word: "said", definition: "Mentioned earlier; aforesaid." },
    { word: "barf", definition: "Vomit" },
    { word: "manat", definition: "The basic unit of currency for Azerbaijan; symbol ₼; subdivided into 100 qapik." },
    { word: "coco", definition: "Coconut palm." },
    { word: "aloud", definition: "Spoken out loud." },
    { word: "yay", definition: "An expression of happiness." },
    { word: "pokes", definition: "A prod, jab, or thrust." },
    { word: "arums", definition: "A flower or plant in the genus Arum" },
    { word: "lots", definition: "A large quantity or number; a great deal." },
    { word: "vary", definition: "Alteration; change." },
    { word: "jean", definition: "Denim." },
    { word: "oka", definition: "A former Turkish, Egyptian, Hungarian, and Romanian unit of weight, usually of a little more than a kilogram." },
    { word: "nomes", definition: "A prefecture or unit of regional government in Greece." },
    { word: "cult", definition: "A group or sect of people with a deviant religious, philosophical or cultural identity, often existing on the margins of society or exploitative towards its members." },
    { word: "targe", definition: "A small shield" },
    { word: "batch", definition: "The quantity of bread or other baked goods baked at one time." },
    { word: "mixer", definition: "One who, or a device that, mixes or merges things together." },
    { word: "swats", definition: "A hard stroke, hit or blow, e.g., as part of a spanking." },
    { word: "hosts", definition: "One which receives or entertains a guest, socially, commercially, or officially." },
    { word: "navel", definition: "The indentation or bump remaining in the abdomen of mammals where the umbilical cord was attached before birth." },
    { word: "six", definition: "The digit or figure 6." },
    { word: "forgo", definition: "To let pass, to leave alone, to let go." },
    { word: "lav", definition: "An item of jewellery consisting of a pendant, sometimes with one stone, suspended from a necklace." },
    { word: "pause", definition: "A button whose functions are pausing and resuming something, such as a DVD player, a video game or a computer." },
    { word: "whir", definition: "A sibilant buzz or vibration; the sound of something in rapid motion." },
    { word: "ashy", definition: "Having the color of ashes." },
    { word: "brand", definition: "A conflagration; a flame." },
    { word: "golf", definition: "A ball game played by individuals competing against one another in which the object is to hit a ball into each of a series of (usually 18 or nine) holes in the minimum number of strokes." },
    { word: "freer", definition: "(social) Unconstrained." },
    { word: "empty", definition: "(usually plural) A container, especially a bottle, whose contents have been used up, leaving it empty." },
    { word: "nappe", definition: "The profile of a body of water flowing over an obstruction in a vertical drop." },
    { word: "mercs", definition: "A mercenary." },
    { word: "spoor", definition: "The track, trail, droppings or scent of an animal" },
    { word: "pasha", definition: "A high-ranking Turkish military officer, especially as a commander or regional governor; the highest honorary title during the Ottoman Empire." },
    { word: "amyl", definition: "Pentyl" },
    { word: "share", definition: "A portion of something, especially a portion given or allotted to someone." },
    { word: "byres", definition: "A barn, especially one used for keeping cattle in." },
    { word: "goat", definition: "A mammal, Capra aegagrus hircus, and similar species of the genus Capra." },
    { word: "clepe", definition: "A cry; an appeal; a call." },
    { word: "tests", definition: "A challenge, trial." },
    { word: "soy", definition: "A common East Asian liquid sauce, made by subjecting boiled beans to long fermentation and then long digestion in salt and water." },
    { word: "eidos", definition: "Form; essence; type; species." },
    { word: "boozy", definition: "(of a person) Intoxicated by alcohol." },
    { word: "ankus", definition: "The hooked goad that is used in India to control elephants." },
    { word: "pled", definition: "To present (an argument or a plea), especially in a legal case." },
    { word: "wiggy", definition: "Crazy." },
    { word: "speck", definition: "A tiny spot, especially of dirt etc." },
    { word: "zloty", definition: "Złoty, the currency unit of Poland, divided into 100 groszy." },
    { word: "knobs", definition: "A rounded protuberance, especially one arising from a flat surface; a fleshy lump or caruncle." },
    { word: "loups", definition: "A mass of iron in a pasty condition gathered into a ball for the tilt hammer or rolls." },
    { word: "puffs", definition: "To emit smoke, gas, etc., in puffs." },
    { word: "liken", definition: "(followed by to or unto) To compare; to state that (something) is like (something else)." },
    { word: "cerci", definition: "Structures on the end of on the end of the abdomen of most insects, sometimes long, hairlike sensory organs and sometimes smaller and rigid." },
    { word: "hoofs", definition: "The tip of a toe of an ungulate such as a horse, ox or deer, strengthened by a thick keratin covering." },
    { word: "cames", definition: "A grooved strip of lead used to hold panes of glass together." },
    { word: "balm", definition: "Any of various aromatic resins exuded from certain plants, especially trees of the genus Commiphora of Africa, Arabia and India and Myroxylon of South America." },
    { word: "kops", definition: "A hill or mountain." },
    { word: "era", definition: "A time period of indeterminate length, generally more than one year." },
    { word: "three", definition: "The digit/figure 3." },
    { word: "admen", definition: "A person in the business of devising, writing, illustrating or selling advertisements." },
    { word: "reck", definition: "To make account of; to care for; to heed, regard, consider." },
    { word: "erode", definition: "To wear away by abrasion, corrosion or chemical reaction." },
    { word: "mill", definition: "A grinding apparatus for substances such as grains, seeds, etc." },
    { word: "luma", definition: "A currency unit of Armenia, worth one hundredth of an Armenian dram." },
    { word: "forb", definition: "Any non-woody flowering plant that is not a graminoid (a grass, sedge, or rush)." },
    { word: "could", definition: "(auxiliary verb, defective) To know how to; to be able to." },
    { word: "noms", definition: "To eat with noisy enjoyment." },
    { word: "dame", definition: "Usually capitalized as Dame: a title equivalent to Sir for a female knight." },
    { word: "miff", definition: "A small argument; a quarrel." },
    { word: "piper", definition: "A musician who plays a pipe." },
    { word: "moral", definition: "(of a narrative) The ethical significance or practical lesson." },
    { word: "tepee", definition: "Alternative form of teepee" },
    { word: "bilby", definition: "Australian desert marsupial (Macrotis lagotis), with distinctive large ears and approximately the size of a rabbit." },
    { word: "skip", definition: "A leaping, jumping or skipping movement." },
    { word: "jams", definition: "A sweet mixture of fruit boiled with sugar and allowed to congeal. Often spread on bread or toast or used in jam tarts." },
    { word: "timed", definition: "To measure or record the time, duration, or rate of." },
    { word: "clef", definition: "A symbol found on a musical staff that indicates the pitches represented by the lines and the spaces on the staff" },
    { word: "deals", definition: "A division, a portion, a share." },
    { word: "very", definition: "True, real, actual." },
    { word: "clag", definition: "A glue or paste made from starch." },
    { word: "fay", definition: "To fit." },
    { word: "bro", definition: "Brother; a male sibling" },
    { word: "barf", definition: "Vomit" },
    { word: "egged", definition: "To throw eggs at." },
    { word: "naked", definition: "Bare, not covered by clothing." },
    { word: "quire", definition: "One-twentieth of a ream of paper; a collection of twenty-four or twenty-five sheets of paper of the same size and quality, unfolded or having a single fold." },
    { word: "nerds", definition: "(sometimes derogatory) A person who is intellectual but generally introverted" },
    { word: "bead", definition: "Prayer, later especially with a rosary." },
    { word: "boron", definition: "The chemical element (symbol B) with an atomic number of 5, which is a metalloid found in its pure form as a dark amorphous powder." },
    { word: "urge", definition: "A strong desire; an itch to do something." },
    { word: "chop", definition: "A cut of meat, often containing a section of a rib." },
    { word: "prau", definition: "A sailing vessel found in the waters of Micronesia and Indonesia; it has a single, large outrigger and a triangular sail." },
    { word: "jemmy", definition: "A baked sheep's head." },
    { word: "cutin", definition: "A waxy polymer of hydroxy acids that is the main constituent of plant cuticle." },
    { word: "repp", definition: "A fabric made of silk or wool, or of silk and wool, and having a transversely corded or ribbed surface." },
    { word: "best", definition: "The supreme effort one can make, or has made." },
    { word: "prow", definition: "The front part of a vessel" },
    { word: "prosy", definition: "Unpoetic (of speech or writing); dull and unimaginative." },
    { word: "arts", definition: "The conscious production or arrangement of sounds, colours, forms, movements, or other elements in a manner that affects the senses and emotions, usually specifically the production of the beautiful in a graphic or plastic medium." },
    { word: "ends", definition: "The terminal point of something in space or time." },
    { word: "cods", definition: "A small bag or pouch." },
    { word: "germs", definition: "The small mass of cells from which a new organism develops; a seed, bud or spore." },
    { word: "aspic", definition: "A dish in which ingredients are set into a gelatine, jelly-like substance made from a meat stock or consommé." },
    { word: "nit", definition: "The egg of a louse." },
    { word: "inurn", definition: "To place (the remains of a person who has died) in an urn or other container." },
    { word: "sane", definition: "Being in a healthy condition; not deranged; thinking rationally." },
    { word: "homer", definition: "Various former units of volume, particularly:" },
    { word: "pods", definition: "A seed case for legumes (e.g. peas, beans, peppers); a seedpod." },
    { word: "glads", definition: "To make glad" },
    { word: "hasty", definition: "Acting in haste; being too hurried or quick" },
    { word: "genie", definition: "A jinn, a being descended from the jann, normally invisible to the human eye, but who may also appear in animal or human form." },
    { word: "allod", definition: "Allodium" },
    { word: "dark", definition: "Having an absolute or (more often) relative lack of light." },
    { word: "titty", definition: "A breast" },
    { word: "geode", definition: "A nodule of stone having a cavity lined with mineral or crystal matter on the inside wall." },
    { word: "spied", definition: "To act as a spy." },
    { word: "truss", definition: "A bandage and belt used to hold a hernia in place." },
    { word: "beys", definition: "A governor of a province or district in the Turkish dominions" },
    { word: "await", definition: "A waiting for; ambush." },
    { word: "topos", definition: "A literary theme or motif; a rhetorical convention or formula." },
    { word: "boho", definition: "A bohemian." },
    { word: "slurs", definition: "An insult or slight." },
    { word: "meds", definition: "(chiefly in the plural) Medications, especially prescribed psychoactive medications." },
    { word: "betel", definition: "Either of two plants often used in combination:" },
    { word: "tules", definition: "Any of a number of large freshwater sedges of western North America formerly classified in the genus Scirpus, but now mostly as Schoenoplectus" },
    { word: "coots", definition: "Any of various aquatic birds of the genus Fulica that are mainly black with a prominent frontal shield on the forehead." },
    { word: "sired", definition: "(of a male) to procreate; to father, beget, impregnate." },
    { word: "glue", definition: "A hard gelatin made by boiling bones and hides, used in solution as an adhesive; or any sticky adhesive substance." },
    { word: "unsay", definition: "To withdraw, retract (something said)." },
    { word: "eels", definition: "Any freshwater or marine fish of the order Anguilliformes, which are elongated and resemble snakes." },
    { word: "yoni", definition: "The vulva or vagina, or a symbol of them, especially as an object of veneration within certain types of Hinduism, Buddhism, and other cultures." },
    { word: "hah", definition: "A representation of laughter." },
    { word: "snick", definition: "A small deflection of the ball off the side of the bat; often carries to the wicketkeeper for a catch" },
    { word: "plump", definition: "To grow plump; to swell out." },
    { word: "spitz", definition: "Any of several Nordic breeds of dog such as the Pomeranian or Samoyed" },
    { word: "byres", definition: "A barn, especially one used for keeping cattle in." },
    { word: "fetid", definition: "The foul-smelling asafoetida plant, or its extracts." },
    { word: "diary", definition: "A daily log of experiences, especially those of the writer." },
    { word: "ancon", definition: "The corner of a wall or rafter." },
    { word: "posit", definition: "Something that is posited; a postulate." },
    { word: "valet", definition: "A man's personal male attendant, responsible for his clothes and appearance." },
    { word: "yawn", definition: "The action of yawning; opening the mouth widely and taking a long, rather deep breath, often because one is tired or bored." },
    { word: "pyre", definition: "A funeral pile; a combustible heap on which corpses are burned." },
    { word: "dis", definition: "An insult or put-down; an expression of disrespect." },
    { word: "kolo", definition: "A national folk dance common in regions pertaining to South Slavic people, performed in a circle." },
    { word: "jaded", definition: "To tire, weary or fatigue" },
    { word: "mash", definition: "A mass of mixed ingredients reduced to a soft pulpy state by beating or pressure; a mass of anything in a soft pulpy state." },
    { word: "fined", definition: "To make finer, purer, or cleaner; to purify or clarify." },
    { word: "krona", definition: "The official currency of Sweden." },
    { word: "dorks", definition: "A long Scottish dagger with a straight blade." },
    { word: "adzed", definition: "To shape a material using an adze." },
    { word: "lager", definition: "A type of beer, brewed using a bottom-fermenting yeast." },
    { word: "payed", definition: "To give money or other compensation to in exchange for goods or services." },
    { word: "balk", definition: "An uncultivated ridge formed in the open field system, caused by the action of ploughing." },
    { word: "last", definition: "Final, ultimate, coming after all others of its kind." },
    { word: "na", definition: "Not." },
    { word: "vary", definition: "Alteration; change." },
    { word: "grubs", definition: "An immature stage in the life cycle of an insect; a larva." },
    { word: "urge", definition: "A strong desire; an itch to do something." },
    { word: "ski", definition: "One of a pair of long flat runners designed for gliding over snow or water" },
    { word: "gutty", definition: "Charged or sprinkled with drops." },
    { word: "genoa", definition: "A staysail that resembles a jib but extends aft beyond the mast." },
    { word: "linky", definition: "Of or pertaining to hyperlinks." },
    { word: "gey", definition: "Fairly good; considerable." },
    { word: "quire", definition: "One-twentieth of a ream of paper; a collection of twenty-four or twenty-five sheets of paper of the same size and quality, unfolded or having a single fold." },
    { word: "alto", definition: "A musical part or section higher than tenor and lower than soprano, formerly the part that performed a countermelody above the tenor or main melody." },
    { word: "tonus", definition: "Tonicity; tone" },
    { word: "moola", definition: "Money, cash." },
    { word: "dope", definition: "Any viscous liquid or paste, such as a lubricant, used in preparing a surface." },
    { word: "lorry", definition: "A motor vehicle for transporting goods, and in some cases people; a truck." },
    { word: "irk", definition: "To irritate; annoy; bother" },
    { word: "tole", definition: "A decorative metalware having a lacquered or enamelled surface that is painted or gilded" },
    { word: "psis", definition: "The twenty-third letter of Classical and Modern Greek and the twenty-fifth letter of Old and Ancient Greek." },
    { word: "gypsy", definition: "(sometimes offensive) A member of the Romani people, or one of the sub-groups (Roma, Sinti, Romanichal, etc)." },
    { word: "woad", definition: "The plant Isatis tinctoria." },
    { word: "boxer", definition: "A participant (fighter) in a boxing match." },
    { word: "cukes", definition: "A cucumber." },
    { word: "foist", definition: "A thief or pickpocket." },
    { word: "sumo", definition: "A stylised Japanese form of wrestling in which a wrestler loses if he is forced from the ring, or if any part of his body except the soles of his feet touches the ground." },
    { word: "years", definition: "A solar year, the time it takes the Earth to complete one revolution of the Sun (between 365.24 and 365.26 days depending on the point of reference)." },
    { word: "crews", definition: "A pen for livestock such as chickens or pigs" },
    { word: "sight", definition: "(in the singular) The ability to see." },
    { word: "sight", definition: "(in the singular) The ability to see." },
    { word: "hah", definition: "A representation of laughter." },
    { word: "timed", definition: "To measure or record the time, duration, or rate of." },
    { word: "media", definition: "The middle layer of the wall of a blood vessel or lymph vessel which is composed of connective and muscular tissue." },
    { word: "lungi", definition: "A garment worn around the waist, especially by men, in Southern India, Bangladesh, Burma, and Pakistan." },
    { word: "whist", definition: "Any of several four-player card games, similar to bridge." },
    { word: "eels", definition: "Any freshwater or marine fish of the order Anguilliformes, which are elongated and resemble snakes." },
    { word: "rebel", definition: "A person who resists an established authority, often violently" },
    { word: "gilt", definition: "To cover with a thin layer of gold; to cover with gold leaf." },
    { word: "zeds", definition: "The name of the Latin-script letter Z." },
    { word: "mimed", definition: "To mimic." },
    { word: "rids", definition: "To free (something) from a hindrance or annoyance." },
    { word: "mourn", definition: "Sorrow, grief." },
    { word: "khaki", definition: "A dull, yellowish-brown colour, the colour of dust." },
    { word: "stoke", definition: "To poke, pierce, thrust." },
    { word: "gyps", definition: "(sometimes offensive) A member of the Romani people, or one of the sub-groups (Roma, Sinti, Romanichal, etc)." },
    { word: "piny", definition: "Of, pertaining to, or having many pines" },
    { word: "ended", definition: "To come to an end" },
    { word: "lands", definition: "The part of Earth which is not covered by oceans or other bodies of water." },
    { word: "zeal", definition: "The fervour or tireless devotion for a person, cause, or ideal and determination in its furtherance; diligent enthusiasm; powerful interest." },
    { word: "betel", definition: "Either of two plants often used in combination:" },
    { word: "years", definition: "A solar year, the time it takes the Earth to complete one revolution of the Sun (between 365.24 and 365.26 days depending on the point of reference)." },
    { word: "drawl", definition: "A way of speaking slowly while lengthening vowel sounds and running words together. Characteristic of some southern US accents, as well as Scots." },
    { word: "roups", definition: "An outcry." },
    { word: "frags", definition: "A fragmentation grenade." },
    { word: "guff", definition: "Nonsensical talk or thinking." },
    { word: "ween", definition: "Doubt; conjecture." },
    { word: "oleum", definition: "A solution of sulfur trioxide in sulfuric acid." },
    { word: "rangy", definition: "Slender and long of limb; lanky" },
    { word: "aides", definition: "An assistant." },
    { word: "hills", definition: "An elevated location smaller than a mountain." },
    { word: "bumph", definition: "Toilet paper." },
    { word: "sirs", definition: "A man of a higher rank or position." },
    { word: "desks", definition: "A table, frame, or case, in past centuries usually with a sloping top but now usually with a flat top, for the use of writers and readers. It often has a drawer or repository underneath." },
    { word: "sarky", definition: "Sarcastic" },
    { word: "awful", definition: "Very bad." },
    { word: "kirks", definition: "A church." },
    { word: "fixes", definition: "A repair or corrective action." },
    { word: "flat", definition: "An area of level ground." },
    { word: "sulus", definition: "An all-purpose skirt-like garment worn by men and women in Fiji." },
    { word: "ticks", definition: "A tiny woodland arachnid of the suborder Ixodida." },
    { word: "power", definition: "Ability to do or undergo something." },
    { word: "brats", definition: "A child who is regarded as mischievous, unruly, spoiled, or selfish." },
    { word: "cola", definition: "The kola plant, genus Cola, famous for its nut, or one of these nuts." },
    { word: "jeep", definition: "A small, blocky, military-style vehicle with four-wheel drive, suited to rough terrain." },
    { word: "sis", definition: "A daughter of the same parents as another person; a female sibling." },
    { word: "goner", definition: "Someone (or something) doomed; a hopeless case." },
    { word: "inurn", definition: "To place (the remains of a person who has died) in an urn or other container." },
    { word: "goy", definition: "A non-Jew, a gentile. (See usage notes)" },
    { word: "sort", definition: "A general type." },
    { word: "zouk", definition: "A style of dance music originating in the French Antilles, combining Latin American, African and Western disco rhythms; a dance to this music" },
    { word: "divan", definition: "A Muslim council of state, specifically that of viziers of the Ottoman Empire that discussed and recommended new laws and law changes to a higher authority (the sultan)." },
    { word: "quint", definition: "An interval of one fifth." },
    { word: "owed", definition: "To be under an obligation to give something back to someone or to perform some action for someone." },
    { word: "coset", definition: "The set that results from applying a group's binary operation with a given fixed element of the group on each element of a given subgroup." },
    { word: "tonal", definition: "Of or relating to tones or tonality." },
    { word: "juju", definition: "A fetish or charm believed by West Africans to have magical or supernatural powers." },
    { word: "arame", definition: "A seaweed, Eisenia bicyclis, used in Japanese cuisine." },
    { word: "frit", definition: "A fused mixture of materials used to make glass." },
    { word: "tis", definition: "A syllable used in solfège to represent the seventh note of a major scale." },
    { word: "boyo", definition: "A boy or lad." },
    { word: "scry", definition: "To predict the future using crystal balls or other objects." },
    { word: "liner", definition: "Someone who fits a lining to something." },
      ],
      "Hard Mode": [
        { word: "crowdy", definition: "A thick gruel of oatmeal and milk or water." },
        { word: "understudies", definition: "A performer who understudies; a standby." },
        { word: "militaristic", definition: "Using the power of the military." },
        { word: "myeloma", definition: "A malignant tumour arising from cells of the bone marrow, specifically plasma cells." },
        { word: "strangles", definition: "A disease of horses caused by an infection by the bacterium Streptococcus equi." },
        { word: "digitalizes", definition: "To digitize, to make digital." },
        { word: "context", definition: "The surroundings, circumstances, environment, background or settings that determine, specify, or clarify the meaning of an event or other occurrence." },
        { word: "deft", definition: "Quick and neat in action; skillful." },
        { word: "pizazz", definition: "Flair, vitality, or zest; energy; vigor." },
        { word: "contracts", definition: "An agreement between two or more parties, to perform a specific job or work order, often temporary or of fixed duration and usually governed by a written agreement." },
        { word: "coming", definition: "To move from further away to nearer to." },
        { word: "trips", definition: "A journey; an excursion or jaunt" },
        { word: "balletic", definition: "Pertaining to or suitable for ballet." },
        { word: "harm", definition: "Physical injury; hurt; damage" },
        { word: "swims", definition: "An act or instance of swimming." },
        { word: "betake", definition: "To beteach." },
        { word: "anchorage", definition: "A harbor, river, or offshore area that can accommodate a ship at anchor, either for quarantine, queuing, or discharge.." },
        { word: "shoplift", definition: "A shoplifter." },
        { word: "grousing", definition: "To seek or shoot grouse." },
        { word: "slotback", definition: "A particular position in American football, often a running back who lines up near the line of scrimmage and can function as a wide receiver." },
        { word: "horsebean", definition: "Broad bean (Vicia faba var. equina)" },
        { word: "outrival", definition: "To outperform; to outdo." },
        { word: "teeniest", definition: "Very small; tiny." },
        { word: "tumblebug", definition: "A dung beetle." },
        { word: "standup", definition: "A performance of stand-up comedy; jokes delivered standing on a stage" },
        { word: "newsboys", definition: "A boy, or by extension a man, who delivers and/or sells newspapers." },
        { word: "deliverances", definition: "Act of delivering or conveying something." },
        { word: "ferments", definition: "Something, such as a yeast or barm, that causes fermentation." },
        { word: "pageboy", definition: "A boy who serves as a page." },
        { word: "firehouses", definition: "A house containing a fire to heat it; a dwelling-house, as opposed to a barn, a stable, or other outhouse." },
        { word: "offsets", definition: "Anything that acts as counterbalance; a compensating equivalent." },
        { word: "affrighted", definition: "To terrify, to frighten, to inspire fright in." },
        { word: "scoops", definition: "Any cup- or bowl-shaped tool, usually with a handle, used to lift and move loose or soft solid material." },
        { word: "pianissimo", definition: "A dynamic sign indicating that a portion of music should be played pianissimo." },
        { word: "dailies", definition: "Something that is produced, consumed, used, or done every day." },
        { word: "flout", definition: "The act by which something is flouted; violation of a law." },
        { word: "belief", definition: "Mental acceptance of a claim as true." },
        { word: "hurdles", definition: "An artificial barrier, variously constructed, over which athletes or horses jump in a race." },
        { word: "farmworker", definition: "A person hired to work on the farm or in the agricultural industry." },
        { word: "inkwell", definition: "A container for ink, designed and usually positioned so that a person may conveniently dip a pen into it whenever a refill is needed." },
        { word: "microwave", definition: "An electromagnetic wave with wavelength between that of infrared light and radio waves." },
        { word: "coetaneous", definition: "Belonging to the same age, era or period; coeval or contemporary." },
        { word: "invitee", definition: "A person who is invited into or onto someone else's premises" },
        { word: "telegraphs", definition: "To send a message by telegraph." },
        { word: "infringed", definition: "Break or violate a treaty, a law, a right etc." },
        { word: "perdition", definition: "Eternal damnation." },
        { word: "hardtack", definition: "A large, hard biscuit made from unleavened flour and water; formerly used as a long-term staple food aboard ships." },
        { word: "spraddled", definition: "To spread apart (the legs)." },
        { word: "strokes", definition: "An act of stroking (moving one's hand over a surface)." },
        { word: "shmoozed", definition: "To talk casually, especially in order to gain an advantage or make a social connection." },
        { word: "gravimetry", definition: "The measurement of gravity (the strength of the gravitational field)." },
        { word: "discounts", definition: "A reduction in price." },
        { word: "enamors", definition: "(mostly in the passive, followed by 'of' or 'with') To cause to be in love." },
        { word: "fleury", definition: "(especially of a cross) Decorated (finished at the ends) with fleurs-de-lis." },
        { word: "paraglides", definition: "To take part in paragliding." },
        { word: "anomie", definition: "Alienation or social instability caused by erosion of standards and values." },
        { word: "contrasting", definition: "To set in opposition in order to show the difference or differences between." },
        { word: "densest", definition: "Having relatively high density." },
        { word: "freewill", definition: "Voluntary, done of one's own accord" },
        { word: "unenriched", definition: "Not enriched." },
        { word: "sparring", definition: "To bolt, bar." },
        { word: "sedimented", definition: "To deposit material as a sediment." },
        { word: "pronouncement", definition: "An official public announcement." },
        { word: "leveller", definition: "The same height at all places; parallel to a flat ground." },
        { word: "grantee", definition: "The person to whom something is granted." },
        { word: "blowjobs", definition: "(sex) An act of fellatio, or sucking a penis or other phallic object (such as a dildo). Stimulation of a somebody's penis or testicles with a person's lips, tongue or mouth with the purpose of giving the receiver sexual pleasure. It may or may not result in orgasm." },
        { word: "incomparable", definition: "Something beyond compare; a thing with which there is no comparison." },
        { word: "werwolves", definition: "A person who is transformed or can transform into a wolf or a wolflike human, often said to transform during a full moon." },
        { word: "lectern", definition: "A stand with a slanted top used to support a bible from which passages are read during a church service." },
        { word: "banshee", definition: "(Irish folklore) A female spirit, usually taking the form of a woman whose mournful wailing warns of an impending death." },
        { word: "hognut", definition: "The pignut or hickory (Carya glabra of family Juglandaceae)." },
        { word: "sterols", definition: "Any steroid that contains a hydroxyl group in the 3-position of the A-ring." },
        { word: "condiment", definition: "Something used to enhance the flavor of food; for example, salt or pepper." },
        { word: "transuded", definition: "To pass through a pore, membrane or interstice." },
        { word: "ails", definition: "An ailment; trouble; illness." },
        { word: "ungodliest", definition: "Of a person: lacking reverence for God; of an action: not in accordance with God's will or religious teachings." },
        { word: "ratings", definition: "A position on a scale" },
        { word: "plating", definition: "To cover the surface material of an object with a thin coat of another material, usually a metal." },
        { word: "contaminates", definition: "To make something dangerous or toxic by introducing impurities or foreign matter." },
        { word: "cirrus", definition: "A tendril." },
        { word: "whiney", definition: "Whining; tending to whine or complain." },
        { word: "supervening", definition: "To follow (something) closely, either as a consequence or in contrast." },
        { word: "wholesaled", definition: "To sell at wholesale." },
        { word: "circumvolution", definition: "The act of revolution, rotation or gyration around an axis." },
        { word: "banco", definition: "A bank, especially that of Venice; formerly used to indicate bank money, as distinguished from the current money when it has become depreciated." },
        { word: "emerging", definition: "To come into view." },
        { word: "blarneyed", definition: "To beguile with flattery." },
        { word: "bonzes", definition: "A Buddhist monk or priest in East Asia." },
        { word: "frontons", definition: "A pediment." },
        { word: "fortieths", definition: "The person or thing in the fortieth position." },
        { word: "startups", definition: "The act or process of starting a process or machine." },
        { word: "diapaused", definition: "Undergoing diapause" },
        { word: "sunups", definition: "The time of day when the sun appears above the eastern horizon." },
        { word: "chimleys", definition: "A vertical tube or hollow column used to emit environmentally polluting gaseous and solid matter (including but not limited to by-products of burning carbon or hydrocarbon based fuels); a flue." },
        { word: "logophiles", definition: "One who loves words; a word buff." },
        { word: "benefice", definition: "Land granted to a priest in a church that has a source of income attached to it." },
        { word: "transmissions", definition: "The act of transmitting, e.g. data or electric power." },
        { word: "deoxygenated", definition: "To remove dissolved oxygen from (something, such as water or blood)." },
        { word: "linguine", definition: "Ribbons of pasta, cut from a sheet, not as wide as tagliatelle." },
        { word: "lentils", definition: "Any of several plants of the genus Lens, especially Lens culinaris, from southwest Asia, that have edible, lens-shaped seeds within flattened pods." },
        { word: "imparts", definition: "To give or bestow (e.g. a quality or property)." },
        { word: "infested", definition: "To inhabit a place in unpleasantly large numbers; to plague, harass." },
        { word: "tried", definition: "Tested, hence, proven to be firm or reliable." },
        { word: "inky", definition: "Of the colour of ink, especially black ink; dark." },
        { word: "hayfields", definition: "A field of hay." },
        { word: "neuters", definition: "An organism, either vegetable or animal, which at its maturity has no generative organs, or but imperfectly developed ones, as a plant without stamens or pistils, as the garden Hydrangea; especially, one of the imperfectly developed females of certain social insects, as of the ant and the common honeybee, which perform the labors of the community, and are called workers." },
        { word: "smallmouths", definition: "A variety of bass (fish) having a small mouth" },
        { word: "lawns", definition: "An open space between woods." },
        { word: "aureolas", definition: "Radiance of luminous cloud that surrounds the figure in a painting of a sacred personage." },
        { word: "creolising", definition: "To cause a pidgin language rapidly expanding in vocabulary and grammatical rules to become ultimately a creole." },
        { word: "rumored", definition: "(usually used in the passive voice) To tell a rumor about; to gossip." },
        { word: "logographs", definition: "A character or symbol that represents a word or phrase." },
        { word: "micromanaging", definition: "To manage, direct, or control a person, group, or system to an unnecessary level of detail or precision." },
        { word: "dishearten", definition: "To discourage someone by removing their enthusiasm or courage." },
        { word: "jimmies", definition: "(especially New England and Philadelphia) Chocolate sprinkles used as a topping for ice cream, cookies, or cupcakes." },
        { word: "bicycle", definition: "A vehicle that has two wheels, one behind the other, a steering handle, and a saddle seat or seats and is usually propelled by the action of a rider’s feet upon pedals." },
        { word: "inconvertible", definition: "Not convertible" },
        { word: "unwanted", definition: "One who or that which is not wanted; an undesirable." },
        { word: "browns", definition: "A colour like that of chocolate or coffee." },
        { word: "splendiferous", definition: "Beautiful, splendid" },
        { word: "neurofibromata", definition: "A benign tumor composed of Schwann cells" },
        { word: "benchmarks", definition: "A standard by which something is evaluated or measured." },
        { word: "whispered", definition: "To speak softly, or under the breath, so as to be heard only by one near at hand; to utter words without sonant breath; to talk without that vibration in the larynx which gives sonorous, or vocal, sound." },
        { word: "ornithology", definition: "The branch of zoology that deals with the scientific study of birds." },
        { word: "felonies", definition: "A serious criminal offense, which, under United States federal law, is punishable by imprisonment for a term exceeding one year or by death." },
        { word: "wingspread", definition: "The distance between the extreme tips of the wings of a bird, insect or aircraft." },
        { word: "slag", definition: "Waste material from a coal mine" },
        { word: "quaint", definition: "Of a person: cunning, crafty." },
        { word: "predominance", definition: "The condition or state of being predominant; ascendancy, domination, preeminence, preponderance." },
        { word: "soaring", definition: "To fly high with little effort, like a bird." },
        { word: "urtext", definition: "A primitive, seminal, or prototypical example of an artistic genre or the basis of an ideological movement." },
        { word: "overmasters", definition: "To overpower or overwhelm." },
        { word: "harrumphing", definition: "To dislike, protest, or dismiss." },
        { word: "elongation", definition: "The act of lengthening" },
        { word: "lands", definition: "The part of Earth which is not covered by oceans or other bodies of water." },
        { word: "misspells", definition: "To spell incorrectly." },
        { word: "bulgier", definition: "Having one or more bulges; bulging" },
        { word: "tetanus", definition: "A serious and often fatal disease caused by the infection of an open wound with the anaerobic bacterium Clostridium tetani, found in soil and the intestines and faeces of animals." },
        { word: "quandongs", definition: "Any of several species of Santalum:" },
        { word: "collops", definition: "A slice of meat." },
        { word: "parlance", definition: "A certain way of speaking, of using words, especially when it comes to those with a particular job or interest." },
        { word: "snaffle", definition: "A broad-mouthed, loose-ringed bit (metal in a horse's mouth). It brings pressure to bear on the tongue and bars and corners of the mouth. Often used as a training bit." },
        { word: "costlier", definition: "Of high cost; expensive." },
        { word: "suppositions", definition: "Something that is supposed; an assumption made to account for known facts, conjecture." },
        { word: "catheads", definition: "A heavy piece of timber projecting from each side of the bow of a ship for holding anchors which were fitted with a stock in position for letting go or for securing after weighing." },
        { word: "pupping", definition: "To give birth to pups." },
        { word: "infix", definition: "A morpheme inserted inside an existing word, such as -bloody- in English." },
        { word: "colonizers", definition: "One who establishes or joins a colony; a colonist" },
        { word: "subscription", definition: "Access to a resource for a period of time, generally for payment." },
        { word: "afreets", definition: "(Islamic mythology) a kind of djinn mentioned in the Qur'an." },
        { word: "faves", definition: "Favorite (US) or favourite (UK)" },
        { word: "acquirers", definition: "One who acquires." },
        { word: "borking", definition: "(US politics) To defeat a person's appointment or election, judicial nomination, etc., through a concerted attack on the person's character, background, and philosophy." },
        { word: "thro", definition: "Through" },
        { word: "reapply", definition: "To apply again." },
        { word: "stepdaughters", definition: "The daughter of one's spouse and not of oneself." },
        { word: "endotherms", definition: "An animal that maintains a constant body temperature" },
        { word: "kiboshing", definition: "To decisively terminate." },
        { word: "commissary", definition: "A store primarily serving persons in an institution, most often soldiers or prisoners." },
        { word: "virginal", definition: "A musical instrument in the harpsichord family." },
        { word: "reinfect", definition: "Infect again" },
        { word: "holly", definition: "Any of various shrubs or (mostly) small trees, of the genus Ilex, either evergreen or deciduous, used as decoration especially at Christmas." },
        { word: "displeasing", definition: "To make not pleased; to cause a feeling of disapprobation or dislike in; to be disagreeable to; to vex slightly." },
        { word: "reinforcements", definition: "The act, process, or state of reinforcing or being reinforced." },
        { word: "stringy", definition: "Composed of, or resembling, string or strings." },
        { word: "calcifuges", definition: "Any plant that does not thrive in a soil rich in lime or chalk" },
        { word: "ogams", definition: "A single character in this alphabet." },
        { word: "exhaust", definition: "A system consisting of the parts of an engine through which burned gases or steam are discharged; see also exhaust system." },
        { word: "assurances", definition: "The act of assuring; a declaration tending to inspire full confidence; that which is designed to give confidence." },
        { word: "clodpole", definition: "A stupid person; blockhead" },
        { word: "workbenches", definition: "A sturdy bench or table at which manual work is done by a carpenter, machinist, etc." },
        { word: "unbrace", definition: "To undo, unfasten; to relax, loosen." },
        { word: "freshest", definition: "Newly produced or obtained; recent." },
        { word: "unadulterated", definition: "Pure; not mixed or adulterated with anything" },
        { word: "absences", definition: "A state of being away or withdrawn from a place or from companionship; the period of being away." },
        { word: "albumen", definition: "The white part of an egg; being mostly the protein albumin and water." },
        { word: "downspouts", definition: "A vertical pipe or conduit that carries rainwater from the scupper, guttering of a building to a lower roof level, drain, ground or storm water runoff system." },
        { word: "dotty", definition: "Mildly insane or eccentric; often, senile." },
        { word: "teak", definition: "An extremely durable timber highly valued for shipbuilding and other purposes, yielded by Tectona grandis (and Tectona spp.)." },
        { word: "awhile", definition: "For some time; for a short time." },
        { word: "quells", definition: "A subduing." },
        { word: "lapping", definition: "To enfold; to hold as in one's lap; to cherish." },
        { word: "rhythm", definition: "The variation of strong and weak elements (such as duration, accent) of sounds, notably in speech or music, over time; a beat or meter." },
        { word: "desired", definition: "To want; to wish for earnestly." },
        { word: "benefice", definition: "Land granted to a priest in a church that has a source of income attached to it." },
        { word: "collops", definition: "A slice of meat." },
        { word: "madrona", definition: "The strawberry tree (Arbutus unedo)." },
        { word: "footslog", definition: "An instance of footslogging." },
        { word: "enhancer", definition: "Something that enhances." },
        { word: "naw", definition: "Pronunciation spelling of no." },
        { word: "resected", definition: "To remove (some part of an organ or structure) by surgical means." },
        { word: "unlinking", definition: "To decouple; to remove a link from, or separate the links of." },
        { word: "instead", definition: "In the place of something (usually mentioned earlier); as a substitute or alternative." },
        { word: "spry", definition: "Having great power of leaping or running; nimble; active." },
        { word: "hearthrug", definition: "A rug placed in front of a fireplace, on the hearth." },
        { word: "sore", definition: "An injured, infected, inflamed or diseased patch of skin." },
        { word: "prewarned", definition: "To warn beforehand; to forewarn." },
        { word: "logographs", definition: "A character or symbol that represents a word or phrase." },
        { word: "mammillae", definition: "The nipple." },
        { word: "militaristic", definition: "Using the power of the military." },
        { word: "calcifuges", definition: "Any plant that does not thrive in a soil rich in lime or chalk" },
        { word: "ecarte", definition: "A card game for two persons, with 32 cards, ranking K, Q, J, A, 10, 9, 8, 7. Five cards are dealt each player, and the 11th turned as trump. Five points constitute a game." },
        { word: "captan", definition: "A particular phthalimide fungicide." },
        { word: "suppositions", definition: "Something that is supposed; an assumption made to account for known facts, conjecture." },
        { word: "spoored", definition: "To track an animal by following its spoor" },
        { word: "boras", definition: "A initiation ceremony for males among the Aborigines of New South Wales." },
        { word: "corbeille", definition: "A decorative basket." },
        { word: "hearthrug", definition: "A rug placed in front of a fireplace, on the hearth." },
        { word: "pesos", definition: "A former unit of currency in Spain and Spain's colonies, worth 8 reales; the Spanish dollar." },
        { word: "stomata", definition: "One of the tiny pores in the epidermis of a leaf or stem through which gases and water vapor pass." },
        { word: "unkindness", definition: "The state or quality of being unkind." },
        { word: "quamash", definition: "Any of the North American flowering plants of the genus Camassia." },
        { word: "thinners", definition: "A liquid substance used to thin the consistency of another liquid." },
        { word: "doodad", definition: "A thing (used in a vague way to refer to something whose name one cannot recall); especially an unspecified gadget, device, or part." },
        { word: "remonetizing", definition: "To monetize again." },
        { word: "debiting", definition: "To make an entry on the debit side of an account." },
        { word: "carbanions", definition: "Any organic anion of general formula R3C-" },
        { word: "gravitate", definition: "To move under the force of gravity." },
        { word: "toppled", definition: "To push, throw over, overturn or overthrow something" },
        { word: "microstate", definition: "A country that has a very small population and land area" },
        { word: "dill", definition: "Anethum graveolens (the type species of the genus Anethum), a herb, the seeds of which are moderately warming, pungent, and aromatic, formerly used as a soothing medicine for children; also known as dillseed." },
        { word: "demand", definition: "The desire to purchase goods and services." },
        { word: "actressy", definition: "Characteristic of an actress" },
        { word: "retroflex", definition: "A consonant pronounced with the underside of the tongue approaching or touching the palate." },
        { word: "refrains", definition: "To hold back, to restrain (someone or something)." },
        { word: "prepositive", definition: "A prepositive word." },
        { word: "disyllables", definition: "A word comprising two syllables." },
        { word: "vomitories", definition: "The entrance into a theater or other large public venue, where masses of people are disgorged into the stands; a vomitorium" },
        { word: "deeding", definition: "To transfer real property by deed." },
        { word: "conservators", definition: "One who conserves, preserves or protects something." },
        { word: "suntanning", definition: "To obtain a suntan by exposure to ultraviolet light." },
        { word: "inviable", definition: "Unable to sustain its own life" },
        { word: "oozes", definition: "To be secreted or slowly leak." },
        { word: "druthers", definition: "(often jocular) Wishes, preferences, or ways." },
        { word: "rages", definition: "Violent uncontrolled anger." },
        { word: "haematites", definition: "An iron ore, mainly peroxide of iron, Fe2O3." },
        { word: "supernatant", definition: "The liquid that lies above a sediment or precipitate; supernate" },
        { word: "flawing", definition: "To add a flaw to, to make imperfect or defective." },
        { word: "reaffirming", definition: "To affirm again." },
        { word: "wattlebird", definition: "Any of a group of Australian birds in the genus Anthochaera of the honeyeater family Meliphagidae." },
        { word: "incumbencies", definition: "The state of being incumbent." },
        { word: "travois", definition: "A traditional North American Indian sled-like vehicle, pulled by person, dog, or horse." },
        { word: "feasible", definition: "Able to be done in practice." },
        { word: "landlady", definition: "A female landlord." },
        { word: "vinculum", definition: "A bond or link signifying union." },
        { word: "gluttony", definition: "The vice of eating to excess." },
        { word: "neddy", definition: "A donkey or ass." },
        { word: "fohns", definition: "A warm dry wind blowing down the north sides of the Alps, especially in Switzerland." },
        { word: "beanstalks", definition: "The stem of a bean plant, proverbially fast-growing and tall." },
        { word: "disperses", definition: "To scatter in different directions" },
        { word: "omers", definition: "A former small Hebrew unit of dry volume equal to about 2.3 L or 2.1 quarts." },
        { word: "dental", definition: "Cleaning and polishing of an animal's teeth." },
        { word: "specialises", definition: "To make distinct or separate, particularly:" },
        { word: "anabases", definition: "A military march up-country, especially that of Cyrus the Younger into Asia." },
        { word: "haulms", definition: "The stems of various cultivated plants, left after harvesting the crop to be used as animal litter or for thatching." },
        { word: "sharpen", definition: "(sometimes figurative) To make sharp." },
        { word: "tired", definition: "To become sleepy or weary." },
        { word: "flare", definition: "A sudden bright light." },
        { word: "loopers", definition: "An instrument or tool, such as a bodkin, for forming a loop in yarn or cord, etc." },
        { word: "pictograph", definition: "A picture that represents a word or an idea." },
        { word: "peafowl", definition: "A pheasant of the genus Pavo or Afropavo, notable for the extravagant tails of the males; a peacock (unspecified sex)." },
        { word: "dolloping", definition: "To apply haphazardly in generous lumps or scoops." },
        { word: "croustade", definition: "A edible container (often of pastry) filled with a savoury food" },
        { word: "compositions", definition: "The act of putting together; assembly." },
        { word: "phreak", definition: "A person who engages in phone phreaking." },
        { word: "shallot", definition: "A vegetable in the onion family." },
        { word: "continuities", definition: "Lack of interruption or disconnection; the quality of being continuous in space or time." },
        { word: "metritis", definition: "Inflammation of the uterus." },
        { word: "none", definition: "A person without religious affiliation." },
        { word: "slenderizes", definition: "To make more slender." },
        { word: "monthlong", definition: "Which lasts a month, or approximately so" },
        { word: "whored", definition: "To prostitute oneself." },
        { word: "disaffirm", definition: "To deny, contradict or repudiate" },
        { word: "faldstool", definition: "A portable, folding chair used by a bishop when away from his throne." },
        { word: "weirds", definition: "Fate; destiny; luck." },
        { word: "matriculates", definition: "To enroll as a member of a body, especially of a college or university" },
        { word: "holdups", definition: "A delay or wait." },
        { word: "misfeed", definition: "A fault in a mechanical feed mechanism (in the paper pick-up of a printer, for example)." },
        { word: "stockading", definition: "To enclose in a stockade." },
        { word: "rejoicings", definition: "An act of showing joy." },
        { word: "bathmat", definition: "A small mat used next to a bathtub to absorb water and thus prevent slipping." },
        { word: "choirgirl", definition: "A girl who sings in a choir." },
        { word: "garbage", definition: "Food waste material of any kind." },
        { word: "tidy", definition: "A tabletop container for pens and stationery." },
        { word: "supremacy", definition: "The quality of being supreme." },
        { word: "fornicating", definition: "To engage in fornication; to have sex, especially illicit sex." },
        { word: "delighting", definition: "To give delight to; to affect with great pleasure; to please highly." },
        { word: "trephined", definition: "To use a trephine during surgery." },
        { word: "insets", definition: "A smaller thing set into a larger thing, such as a small picture inside a larger one." },
        { word: "hotel", definition: "A large town house or mansion; a grand private residence, especially in France." },
        { word: "supertonic", definition: "The second note in a diatonic scale." },
        { word: "induced", definition: "To lead by persuasion or influence; incite or prevail upon." },
        { word: "chasing", definition: "To pursue." },
        { word: "alkali", definition: "One of a class of caustic bases, such as soda, soda ash, caustic soda, potash, ammonia, and lithia, whose distinguishing peculiarities are solubility in alcohol and water, uniting with oils and fats to form soap, neutralizing and forming salts with acids, turning to brown several vegetable yellows, and changing reddened litmus to blue." },
        { word: "heed", definition: "Careful attention." },
        { word: "perilymph", definition: "An extracellular fluid found in the scala tympani and scala vestibuli of the cochlea." },
        { word: "semioticians", definition: "One who studies semiotics or semantics" },
        { word: "blotchy", definition: "Covered in blotches." },
        { word: "rencounter", definition: "An encounter between opposing forces; a conflict." },
        { word: "server", definition: "A program that provides services to other programs or devices, either in the same computer or over a computer network." },
        { word: "strawflowers", definition: "Any of many Australian plants of the genus Xerochrysum, especially Xerochrysum bracteatum, having deep yellow flowers than can be readily dried." },
        { word: "flexors", definition: "A muscle whose contraction acts to bend a joint or limb." },
        { word: "spiffy", definition: "A dapper person." },
        { word: "resized", definition: "To alter the size of something." },
        { word: "onionskin", definition: "A thin, strong, light, translucent paper; used especially for making carbon copies." },
        { word: "definitions", definition: "A statement of the meaning of a word or word group or a sign or symbol (dictionary definitions)." },
        { word: "heller", definition: "A German coin equivalent to half a pfennig, later used widely as a small coin in Central Europe and the German Empire." },
        { word: "troponin", definition: "A complex of three regulatory proteins that is integral to muscle contraction in skeletal and cardiac muscle, or any member of this complex. The level of troponin in the blood is often used as an indicator of heart damage." },
        { word: "nonbiological", definition: "Not biological; not consisting of a biological substance or substances." },
        { word: "humid", definition: "Containing perceptible moisture (usually describing air or atmosphere); damp; moist; somewhat wet or watery." },
        { word: "coup", definition: "A quick, brilliant, and highly successful act." },
        { word: "pumper", definition: "One who pumps something." },
        { word: "winkled", definition: "To extract." },
        { word: "zaddikim", definition: "A very righteous person, especially a Hassidic spiritual leader." },
        { word: "solmization", definition: "The sol-fa system of singing." },
        { word: "tastier", definition: "Having a pleasant or satisfying flavor; delicious." },
        { word: "overcame", definition: "To surmount (a physical or abstract obstacle); to prevail over, to get the better of." },
        { word: "wrongs", definition: "Something that is immoral or not good." },
        { word: "echelon", definition: "A level or rank in an organization, profession, or society." },
        { word: "heifers", definition: "A young female cow, (particularly) one over one year old but which has not calved." },
        { word: "expire", definition: "To die." },
        { word: "cheater", definition: "One who cheats." },
        { word: "beguiled", definition: "To deceive or delude (using guile)." },
        { word: "aragonite", definition: "A saline evaporite consisting of anhydrous calcium carbonate with the chemical formula CaCO3; it is dimorphous with calcite." },
        { word: "pliant", definition: "Capable of plying or bending; readily yielding to force or pressure without breaking" },
        { word: "poeticized", definition: "To make poetic, or express in poetry." },
        { word: "ovation", definition: "A victory ceremony of less importance than a triumph." },
        { word: "kelvin", definition: "In the International System of Units, the base unit of thermodynamic temperature; 1/273.16 of the thermodynamic temperature of the triple point of water. Shown as 'K'." },
        { word: "aerograms", definition: "A wireless message." },
        { word: "asperges", definition: "To sprinkle." },
        { word: "countering", definition: "To contradict, oppose." },
        { word: "hots", definition: "(with up) To heat; to make or become hot." },
        { word: "kluge", definition: "To build or use a kludge." },
        { word: "sulfone", definition: "Any of a class of organic compounds that have a sulfonyl functional group attached to two carbon atoms; drugs of this structure have been used to treat leprosy." },
        { word: "nanometre", definition: "An SI subunit of length equal to 10-9 metres. Symbol: nm" },
        { word: "nonpartisan", definition: "One who is not a partisan." },
        { word: "deserted", definition: "To leave (anything that depends on one's presence to survive, exist, or succeed), especially when contrary to a promise or obligation; to abandon; to forsake." },
        { word: "sequester", definition: "Sequestration; separation" },
        { word: "helmsmanship", definition: "The role of helmsman." },
        { word: "eurythmic", definition: "Harmonious" },
        { word: "canonry", definition: "The office of a canon; a benefice or prebend in a cathedral or collegiate church." },
        { word: "tuis", definition: "A New Zealand honeyeater, Prosthemadera novaeseelandiae" },
        { word: "pharaonic", definition: "Of or pertaining to a pharaoh." },
        { word: "trucked", definition: "To drive a truck: Generally a truck driver's slang." },
        { word: "inamoratas", definition: "A female lover or woman with whom one is in love; a mistress" },
        { word: "dejection", definition: "A state of melancholy or depression; low spirits, the blues." },
        { word: "triticale", definition: "A grain crop, a hybrid of wheat and rye, that gives a high yield." },
        { word: "denims", definition: "Jeans made of denim." },
        { word: "arrangers", definition: "One who arranges." },
        { word: "queerest", definition: "Weird, odd or different; whimsical." },
        { word: "grumpy", definition: "Dissatisfied and irritable." },
        { word: "wanner", definition: "Pale, sickly-looking." },
        { word: "setup", definition: "Equipment designed for a particular purpose; an apparatus." },
        { word: "strawberries", definition: "The sweet, usually red, edible fruit of certain plants of the genus Fragaria." },
        { word: "turgid", definition: "Distended beyond the natural state by some internal agent, especially fluid, or expansive force." },
        { word: "greenheart", definition: "A type of tree (Chlorocardium rodiei) native to Guyana." },
        { word: "joblessness", definition: "The state of being jobless or unemployed" },
        { word: "turbulent", definition: "Violently disturbed or agitated; tempestuous, tumultuous" },
        { word: "engulfing", definition: "To overwhelm." },
        { word: "copter", definition: "A helicopter." },
        { word: "demographers", definition: "A person who studies demography" },
        { word: "exoenzymes", definition: "Any enzyme, generated by a cell, that functions outside of that cell." },
        { word: "tangelo", definition: "A citrus fruit that is a cross between a tangerine and a pomelo or a grapefruit." },
        { word: "soupspoon", definition: "A spoon for eating soup, characterised by having a round bowl rather than the usual oval bowl of other types of spoon." },
        { word: "loped", definition: "To travel an easy pace with long strides." },
        { word: "priorities", definition: "An item's relative importance." },
        { word: "elbow", definition: "The joint between the upper arm and the forearm." },
        { word: "rigidifying", definition: "To make rigid, to cause to be or become rigid." },
        { word: "antibacterial", definition: "A drug having the effect of killing or inhibiting bacteria." },
        { word: "nostrils", definition: "Either of the two orifices located on the nose (or on the beak of a bird); used as a passage for air and other gases to travel the nasal passages." },
        { word: "converging", definition: "Of two or more entities, to approach each other; to get closer and closer." },
        { word: "galantines", definition: "A spiced, thickened sauce served with fish or poultry." },
        { word: "tailslide", definition: "A backwards movement of an aircraft at the top of a stall." },
        { word: "mills", definition: "A grinding apparatus for substances such as grains, seeds, etc." },
        { word: "layettes", definition: "A complete set of clothing, bedding and toilet articles for a new baby." },
        { word: "disposing", definition: "(used with 'of') To eliminate or to get rid of something." },
        { word: "latecomers", definition: "One who has arrived comparatively recently." },
        { word: "polyparies", definition: "Polyparium" },
        { word: "ochre", definition: "An earth pigment containing silica, aluminum and ferric oxide" },
        { word: "messmates", definition: "An associate with whom one shares a mess (eating place) on a ship" },
        { word: "apsidal", definition: "Of, pertaining to, or in the form of an apse" },
        { word: "phosphorescing", definition: "To exhibit phosphorescence" },
        { word: "labourers", definition: "One who uses body strength instead of intellectual power to earn a wage, usually hourly." },
        { word: "imperturbable", definition: "Not easily perturbed, upset or excited." },
        { word: "digitoxin", definition: "A toxic cardiac glycoside, obtained from digitalis, related to cardenolide." },
        { word: "bloodfins", definition: "Aphyocharax anisitsi, a South American characin with blood-red tail and fins." },
        { word: "charmingly", definition: "In a charming manner." },
        { word: "caserns", definition: "A lodging for soldiers in garrison towns, usually near the rampart; barracks." },
        { word: "andantes", definition: "A tempo mark directing that a passage is to be played in a moderately slow tempo; faster than adagio but slower than moderato." },
        { word: "sigla", definition: "A letter or other symbol that stands for a word or name." },
        { word: "lave", definition: "To pour or throw out, as water; lade out; bail; bail out." },
        { word: "mischievously", definition: "In a mischievous manner." },
        { word: "squealed", definition: "To scream with a shrill, prolonged sound." },
        { word: "topi", definition: "An antelope of the species Damaliscus korrigum." },
        { word: "snogs", definition: "A passionate kiss." },
        { word: "hematophagous", definition: "Feeding on blood." },
        { word: "workspace", definition: "An area allocated for someone to work in, especially in an office." },
        { word: "germinations", definition: "The process of germinating; the beginning of vegetation or growth from a seed or spore; the first development of germs, either animal or vegetable." },
        { word: "skullduggery", definition: "A devious device or trick." },
        { word: "perfective", definition: "(grammar) a perfective verb form" },
        { word: "centres", definition: "The point in the interior of a circle that is equidistant from all points on the circumference." },
        { word: "teazel", definition: "Any of several plants of the genus Dipsacus." },
        { word: "rechauffes", definition: "Warmed leftover food" },
        { word: "evacuees", definition: "A person who has been evacuated, especially a civilian evacuated from a dangerous place in time of war" },
        { word: "antivirus", definition: "A piece of software that is used to detect, delete and or neutralize computer-based viruses." },
        { word: "harry", definition: "To plunder, pillage, assault." },
        { word: "slogs", definition: "A long, tedious walk, or session of work." },
        { word: "tog", definition: "A cloak." },
        { word: "stoop", definition: "The staircase and landing or porch leading to the entrance of a residence." },
        { word: "septuples", definition: "To multiply by seven." },
        { word: "jenny", definition: "A device for spinning thread from fiber onto multiple spindles (also called spinning jenny)." },
        { word: "arpeggiating", definition: "To play (a chord) as an arpeggio." },
        { word: "thonged", definition: "Having a thong or thongs." },
        { word: "velarization", definition: "The act or process of velarizing." },
        { word: "brainless", definition: "Having no brain." },
        { word: "dissuade", definition: "To convince not to try or do." },
        { word: "chaw", definition: "Chewing tobacco." },
        { word: "eulogise", definition: "To praise, celebrate or pay homage to someone, especially in an eloquent formal eulogy." },
        { word: "grandkid", definition: "A grandchild." },
        { word: "lysimeters", definition: "An instrument that measures the percolation of water through soil" },
        { word: "barnyard", definition: "The yard associated with or surrounding a barn." },
        { word: "reclining", definition: "To cause to lean back; to bend back." },
        { word: "eurhythmic", definition: "Harmonious" },
        { word: "hemocytometers", definition: "A device used to count the number of blood cells in a volume of blood." },
        { word: "perfidy", definition: "A state or act of violating faith or allegiance; violation of a promise or vow, or of trust" },
        { word: "outrushes", definition: "To rush outward; to issue forcibly." },
        { word: "crewnecks", definition: "A round neckline with a ribbed texture." },
        { word: "curvilinear", definition: "(of a line) Having bends; curved; curvilineal." },
        { word: "inane", definition: "That which is void or empty." },
        { word: "larch", definition: "A coniferous tree, of genus Larix, having deciduous leaves, in fascicles." },
        { word: "oaring", definition: "To row; to travel with, or as if with, oars." },
        { word: "gladioli", definition: "The center part of the sternum." },
        { word: "pelletizing", definition: "To form into pellets." },
        { word: "quitting", definition: "To pay (a debt, fine etc.)." },
        { word: "hackers", definition: "One who is expert at programming and solving problems with a computer." },
        { word: "bonesets", definition: "Any of several plants of the genera Eupatorium and Ageratina." },
        { word: "bey", definition: "A governor of a province or district in the Turkish dominions" },
        { word: "thrifts", definition: "The characteristic of using a minimum of something (especially money)." },
        { word: "flail", definition: "A tool used for threshing, consisting of a long handle with a shorter stick attached with a short piece of chain, thong or similar material." },
        { word: "roars", definition: "A long, loud, deep shout, as of rage or laughter, made with the mouth wide open." },
        { word: "part", definition: "A portion; a component." },
        { word: "albumin", definition: "Any of a class of monomeric proteins that are soluble in water, and are coagulated by heat; they occur in egg white, milk etc; they function as carrier protein for steroids, fatty acids, and thyroid hormones and play a role in stabilizing extracellular fluid volume." },
        { word: "felony", definition: "A serious criminal offense, which, under United States federal law, is punishable by imprisonment for a term exceeding one year or by death." },
        { word: "leaden", definition: "To make or become dull or overcast." },
        { word: "lithology", definition: "The study of rocks, with particular emphasis on their description and classification." },
        { word: "stales", definition: "Something stale; a loaf of bread or the like that is no longer fresh." },
        { word: "guillemot", definition: "Any seabird belonging to the genera Uria and Cepphus of the auk family Alcidae. They have black and white bodies and are good at swimming and diving." },
        { word: "postbag", definition: "A bag used for carrying post (mail)" },
        { word: "totalisators", definition: "(UK) the computerised system which runs parimutuel betting, calculating payoff odds, displaying them, and producing tickets based on incoming bets." },
        { word: "augur", definition: "A diviner who foretells events by the behaviour of birds or other animals, or by signs derived from celestial phenomena, or unusual occurrences." },
        { word: "intestinal", definition: "Relating to the intestines." },
        { word: "duststorms", definition: "Phenomenon in which gale- to hurricane-force winds blow particles up in a planet's atmosphere." },
        { word: "angstrom", definition: "A unit of length equal to 10−10 meters (that is, one ten-billionth of a meter), approximately the size of an atom, and denoted by the symbol Å, used especially to measure the wavelength of electromagnetic radiation or distances between atoms." },
        { word: "shrilling", definition: "To make a shrill noise." },
        { word: "manoeuvre", definition: "The planned movement of troops, vehicles etc.; a strategic repositioning; (later also) a large training field-exercise of fighting units." },
        { word: "plaids", definition: "A type of twilled woollen cloth, often with a tartan or chequered pattern." },
        { word: "collops", definition: "A slice of meat." },
        { word: "advertised", definition: "To give (especially public) notice of (something); to announce publicly." },
        { word: "agglutinogens", definition: "Any antigen that stimulates the production of an agglutinin" },
        { word: "consciences", definition: "The moral sense of right and wrong, chiefly as it affects one's own behaviour." },
        { word: "coat", definition: "An outer garment covering the upper torso and arms.Wp" },
        { word: "thonged", definition: "Having a thong or thongs." },
        { word: "ulus", definition: "An all-purpose knife traditionally used by Yup'ik, Inuit, and Aleut women." },
        { word: "brewer", definition: "Someone who brews, or whose occupation is to prepare malt liquors." },
        { word: "incomparable", definition: "Something beyond compare; a thing with which there is no comparison." },
        { word: "coreligionist", definition: "A fellow follower of one's religion." },
        { word: "aspects", definition: "Any specific feature, part, or element of something." },
        { word: "snogs", definition: "A passionate kiss." },
        { word: "unclothing", definition: "To strip of clothes or covering; to make naked." },
        { word: "bicycle", definition: "A vehicle that has two wheels, one behind the other, a steering handle, and a saddle seat or seats and is usually propelled by the action of a rider’s feet upon pedals." },
        { word: "dishonors", definition: "To bring disgrace upon someone or something; to shame." },
        { word: "victimises", definition: "To make someone a victim or sacrifice." },
        { word: "retroflex", definition: "A consonant pronounced with the underside of the tongue approaching or touching the palate." },
        { word: "tilling", definition: "To develop so as to improve or prepare for usage; to cultivate (said of knowledge, virtue, mind etc.)." },
        { word: "sterols", definition: "Any steroid that contains a hydroxyl group in the 3-position of the A-ring." },
        { word: "strawflowers", definition: "Any of many Australian plants of the genus Xerochrysum, especially Xerochrysum bracteatum, having deep yellow flowers than can be readily dried." },
        { word: "thalassic", definition: "Of or relating to seas and oceans" },
        { word: "tawnier", definition: "Of a light brown to brownish orange color." },
        { word: "directionless", definition: "Lacking direction; aimless." },
        { word: "flail", definition: "A tool used for threshing, consisting of a long handle with a shorter stick attached with a short piece of chain, thong or similar material." },
        { word: "dirges", definition: "A mournful poem or piece of music composed or performed as a memorial to a dead person." },
        { word: "detrition", definition: "Attrition; erosion by friction" },
        { word: "maenads", definition: "A female follower of Dionysus, associated with intense reveling." },
        { word: "gibes", definition: "Alternative spelling of gybe" },
        { word: "adduced", definition: "To bring forward or offer, as an argument, passage, or consideration which bears on a statement or case; to cite; to allege." },
        { word: "canonry", definition: "The office of a canon; a benefice or prebend in a cathedral or collegiate church." },
        { word: "firebombs", definition: "A weapon that causes fire, an incendiary weapon." },
        { word: "refutals", definition: "A refutation." },
        { word: "nationalisms", definition: "Patriotism; the idea of supporting one's country, people or culture." },
        { word: "nexus", definition: "A form of connection." },
        { word: "biddable", definition: "Docile, amenable or compliant." },
        { word: "amphisbaenas", definition: "A mythical serpent having a head at each end of its body, able to move in either direction." },
        { word: "insulations", definition: "The act of insulating; detachment from other objects; isolation." },
        { word: "shrilling", definition: "To make a shrill noise." },
        { word: "thinners", definition: "A liquid substance used to thin the consistency of another liquid." },
        { word: "pizazz", definition: "Flair, vitality, or zest; energy; vigor." },
        { word: "microwave", definition: "An electromagnetic wave with wavelength between that of infrared light and radio waves." },
        { word: "longeing", definition: "To work (a horse) in a circle at the end of a long line or rope." },
        { word: "militaristic", definition: "Using the power of the military." },
        { word: "tailor", definition: "A person who makes, repairs, or alters clothes professionally, especially suits and men's clothing." },
        { word: "fleabanes", definition: "Any of various species of flowering plants, mostly in two subfamilies in Asteroideae, that typically repel insects:" },
        { word: "ammunition", definition: "Articles used in charging firearms and ordnance of all kinds; as powder, balls, shot, shells, percussion caps, rockets, etc." },
        { word: "microbiologist", definition: "A scientist whose speciality is microbiology." },
        { word: "thro", definition: "Through" },
        { word: "mills", definition: "A grinding apparatus for substances such as grains, seeds, etc." },
        { word: "passengers", definition: "One who rides or travels in a vehicle, but who does not operate it and is not a member of the crew." },
        { word: "winkled", definition: "To extract." },
        { word: "accelerating", definition: "To cause to move faster; to quicken the motion of; to add to the speed of." },
        { word: "druthers", definition: "(often jocular) Wishes, preferences, or ways." },
        { word: "pumper", definition: "One who pumps something." },
        { word: "flexors", definition: "A muscle whose contraction acts to bend a joint or limb." },
        { word: "harm", definition: "Physical injury; hurt; damage" },
        { word: "heist", definition: "A robbery or burglary, especially from an institution such as a bank or museum." },
        { word: "emerging", definition: "To come into view." },
        { word: "inadvisable", definition: "Unwise; not recommended; not prudent; not to be advised" },
        { word: "cricked", definition: "To develop a crick (cramp, spasm)." },
        { word: "corrigendum", definition: "An error that is to be corrected in a printed work after publication." },
        { word: "exoenzymes", definition: "Any enzyme, generated by a cell, that functions outside of that cell." },
        { word: "brewer", definition: "Someone who brews, or whose occupation is to prepare malt liquors." },
        { word: "squads", definition: "A group of people organized for some common purpose, usually of about ten members." },
        { word: "histone", definition: "Any of various simple water-soluble proteins that are rich in the basic amino acids lysine and arginine and are complexed with DNA in the nucleosomes of eukaryotic chromatin." },
        { word: "perfective", definition: "(grammar) a perfective verb form" },
        { word: "mediumistic", definition: "Of or pertaining to mediums (people claiming to contact the dead); relating to or having the ability to communicate with spirits." },
        { word: "presentient", definition: "Having a presentiment." },
        { word: "painful", definition: "Causing pain or distress, either physical or mental." },
        { word: "dirtier", definition: "Unclean; covered with or containing unpleasant substances such as dirt or grime." },
        { word: "prospectus", definition: "A document, distributed to prospective members, investors, buyers or participants, which describes an institution (such as a university), a publication or a business and what it has to offer." },
        { word: "solmization", definition: "The sol-fa system of singing." },
        { word: "exocarps", definition: "The outermost layer of the pericarp of fruits; the skin or epicarp" },
        { word: "oozes", definition: "To be secreted or slowly leak." },
        { word: "unexpressive", definition: "Not expressive" },
        { word: "cartographic", definition: "Of or pertaining to the making of maps." },
        { word: "dishpans", definition: "A large basin or pan with a flat bottom in which dishes are washed." },
        { word: "contaminates", definition: "To make something dangerous or toxic by introducing impurities or foreign matter." },
        { word: "peewees", definition: "A short or small person; a small object." },
        { word: "unconcealed", definition: "Open to view; not hidden or concealed" },
        { word: "dissuade", definition: "To convince not to try or do." },
        { word: "balked", definition: "To pass over or by." },
        { word: "rationales", definition: "An explanation of the basis or fundamental reasons for something." },
        { word: "workweek", definition: "The range of days of the week that are normally worked" },
        { word: "serviceable", definition: "Easy to service." },
        { word: "spiffy", definition: "A dapper person." },
        { word: "imparting", definition: "To give or bestow (e.g. a quality or property)." },
        { word: "leaden", definition: "To make or become dull or overcast." },
        { word: "gladioli", definition: "The center part of the sternum." },
        { word: "macaroon", definition: "Any of various pastries based on almond and egg white, traditionally made in France." },
        { word: "stoic", definition: "Proponent of stoicism, a school of thought, from in 300 B.C.E. up to about the time of Marcus Aurelius, who holds that by cultivating an understanding of the logos, or natural law, one can be free of suffering." },
        { word: "context", definition: "The surroundings, circumstances, environment, background or settings that determine, specify, or clarify the meaning of an event or other occurrence." },
        { word: "rusticates", definition: "To suspend or expel from a college or university." },
        { word: "maenads", definition: "A female follower of Dionysus, associated with intense reveling." },
        { word: "germinations", definition: "The process of germinating; the beginning of vegetation or growth from a seed or spore; the first development of germs, either animal or vegetable." },
        { word: "joblessness", definition: "The state of being jobless or unemployed" },
        { word: "laundrymen", definition: "A man who is in the business of laundering." },
        { word: "volatilizes", definition: "To make volatile; to cause to evaporate." },
        { word: "gerontology", definition: "The study of the elderly, and of the aging process itself." },
        { word: "proceedings", definition: "The act of one who proceeds, or who prosecutes a design or transaction" },
        { word: "bookable", definition: "Able to be booked or reserved." },
        { word: "telecommutes", definition: "To work from home, sometimes for part of a working day or week, using a computer connected to one's employer's network or via the Internet." },
        { word: "planer", definition: "Of a surface: flat or level." },
        { word: "mouths", definition: "The opening of a creature through which food is ingested." },
        { word: "bikeway", definition: "A bicycle lane or path." },
        { word: "hardtack", definition: "A large, hard biscuit made from unleavened flour and water; formerly used as a long-term staple food aboard ships." },
        { word: "presentient", definition: "Having a presentiment." },
        { word: "chaw", definition: "Chewing tobacco." },
        { word: "eparchies", definition: "One of the districts of the Roman Empire at the third echelon" },
        { word: "bilbos", definition: "A device for punishment. See bilboes." },
        { word: "wassail", definition: "A toast to health, usually on a festive occasion." },
        { word: "greenheart", definition: "A type of tree (Chlorocardium rodiei) native to Guyana." },
        { word: "supernatant", definition: "The liquid that lies above a sediment or precipitate; supernate" },
        { word: "libations", definition: "The act of pouring a liquid, most often wine, in sacrifice on the ground, on a ritual object, or on a victim, in honor of some deity." },
        { word: "depletion", definition: "The act of depleting, or the state of being depleted; exhaustion." },
        { word: "degausses", definition: "To reduce or eliminate the magnetic field from (the hull of a ship, or a computer monitor, etc.)." },
        { word: "drooping", definition: "To hang downward; to sag." },
        { word: "harems", definition: "The private part of an Arab household, traditionally forbidden to male strangers." },
        { word: "ankylostomiasis", definition: "Infection by the hookworm Ancylostoma." },
        { word: "caldarium", definition: "In Roman baths, the hottest room, with a plunge-pool. It preceded the tepidarium and frigidarium." },
        { word: "ootid", definition: "The haploid cell, produced by meiotic division of a secondary oocyte, that is a nearly mature ovum." },
        { word: "essay", definition: "(authorship) A written composition of moderate length, exploring a particular issue or subject." },
        { word: "chaine", definition: "A series of interconnected rings or links usually made of metal." },
        { word: "tostado", definition: "Toasted corn kernels, eaten as a snack." },
        { word: "lugged", definition: "(sometimes figurative) To haul or drag along (especially something heavy); to carry; to pull." },
        { word: "illustrative", definition: "Demonstrative, exemplative, showing an example or demonstrating." },
        { word: "ladanum", definition: "A sticky brown resin obtained from species of rockrose, used mainly in perfume." },
        { word: "frequenter", definition: "A person who frequents; a regular visitor." },
        { word: "gooses", definition: "To sharply poke or pinch someone's buttocks. Derived from a goose's inclination to bite at a retreating intruder's hindquarters." },
        { word: "slammed", definition: "To shut with sudden force so as to produce a shock and noise." },
        { word: "trout", definition: "Any of several species of fish in Salmonidae, closely related to salmon, and distinguished by spawning more than once." },
        { word: "rosebays", definition: "Oleander" },
        { word: "airbus", definition: "A subsonic jet airliner, especially a wide-bodied one." },
        { word: "inflorescence", definition: "Flower cluster; a group or cluster of flowers arranged on a stem that is composed of a main branch or a complicated arrangement of branches." },
        { word: "knave", definition: "A boy; especially, a boy servant." },
        { word: "statewide", definition: "An agency or association operating through a state (political subdivision)." },
        { word: "flamed", definition: "To produce flames; to burn with a flame or blaze." },
        { word: "westwards", definition: "Westward, towards the west" },
        { word: "overcalling", definition: "To call a bet after another player has already called" },
        { word: "include", definition: "A piece of source code or other content that is dynamically retrieved for inclusion in another item." },
        { word: "biologic", definition: "An extremely complex drug, vaccine or antitoxin that is made from a living organism, or from products of a living organism." },
        { word: "cockshies", definition: "A game in which trinkets are set upon sticks, to be thrown at by the players; so called from an ancient popular sport which consisted in shying or throwing cudgels at live cocks." },
        { word: "developmentally", definition: "In terms of development." },
        { word: "preloads", definition: "To load in advance (used especially in reference to software installed on a computer prior to sale)." },
        { word: "disliking", definition: "To displease; to offend. (In third-person only.)" },
        { word: "outdriven", definition: "To drive a vehicle, etc. farther or better than." },
        { word: "belies", definition: "To lie around; encompass." },
        { word: "dropworts", definition: "A perennial herb, Filipendula vulgaris, closely related to meadowsweet." },
        { word: "gratuities", definition: "Something (usually money) given in exchange for influence or as an inducement to dishonesty." },
        { word: "comminuted", definition: "To pulverize; to smash." },
        { word: "proceeded", definition: "To move, pass, or go forward or onward; to advance; to carry on" },
        { word: "wok", definition: "A large, oriental, round-bottomed cooking pan." },
        { word: "mishearing", definition: "To hear wrongly." },
        { word: "superseding", definition: "To take the place of." },
        { word: "footrace", definition: "A race run on foot." },
        { word: "coopt", definition: "To elect as a fellow member of a group, such as a committee." },
        { word: "epidiascopes", definition: "A machine that projects images onto a screen." },
        { word: "sudatoria", definition: "A hot room used to induce sweating, steam room, steam bath, sauna." },
        { word: "proactive", definition: "Acting in advance to deal with an expected change or difficulty" },
        { word: "decimalized", definition: ": To convert to the decimal system." },
        { word: "contralateral", definition: "(especially in plural) The opposite side of the body" },
        { word: "grateful", definition: "Appreciative; thankful." },
        { word: "hundreds", definition: "A hundred-dollar bill, or any other note denominated 100 (e.g. a hundred euros)." },
        { word: "sparers", definition: "One who or that which spares." },
        { word: "embezzlement", definition: "The fraudulent conversion of property from a property owner." },
        { word: "enchanting", definition: "To attract and delight, to charm." },
        { word: "treehouses", definition: "A house, or similar structure within a tree, or several trees, built with light materials; wood, bamboo or aluminum are preferred construction materials." },
        { word: "chinquapin", definition: "Any of the trees in the genus Castanopsis." },
        { word: "freer", definition: "(social) Unconstrained." },
        { word: "cosmos", definition: "The universe." },
        { word: "indoctrinated", definition: "To teach with a biased, one-sided or uncritical ideology; to brainwash." },
        { word: "snobbiest", definition: "Characteristic of a snob." },
        { word: "rickettsias", definition: "Any of a group of gram-negative bacteria, of the genus Rickettsia, carried as parasites by ticks, fleas and lice; they cause typhus and other diseases" },
        { word: "vomitous", definition: "Characteristic of, or causing one to vomit." },
        { word: "sedge", definition: "Any plant of the genus Carex, the true sedge, perennial, endogenous herbs, often growing in dense tufts in marshy places. They have triangular jointless stems, a spiked inflorescence, and long grasslike leaves which are usually rough on the margins and midrib. There are several hundred species." },
        { word: "undershot", definition: "To shoot not far enough or not well enough." },
        { word: "hoppers", definition: "One who or that which hops." },
        { word: "melanite", definition: "A black variety of andradite." },
        { word: "redundancies", definition: "The state of being redundant" },
        { word: "beestings", definition: "The first milk drawn from an animal (especially a cow) after it has given birth." },
        { word: "colatitude", definition: "The complement, in spherical coordinates, of a latitude (the difference between a latitude and 90°)." },
        { word: "kindest", definition: "Having a benevolent, courteous, friendly, generous, gentle, liberal, sympathetic, or warm-hearted nature or disposition, marked by consideration for – and service to – others." },
        { word: "rangelands", definition: "Unimproved land that is suitable for the grazing of livestock" },
        { word: "approaches", definition: "The act of drawing near; a coming or advancing near." },
        { word: "cabaret", definition: "Live entertainment held in a restaurant or nightclub; the genre of music associated with this form of entertainment, especially in early 20th century Europe." },
        { word: "heteronomous", definition: "Arising from an external influence, force, or agency; not autonomous" },
        { word: "canister", definition: "A cylindrical or rectangular container usually of lightweight metal, plastic, or laminated pasteboard used for holding a dry product (as tea, crackers, flour, matches)." },
        { word: "triode", definition: "A thermionic valve containing an anode, a cathode, and a control grid; small changes to the charge on the grid control the flow from cathode to anode, which makes amplification possible." },
        { word: "joggles", definition: "To shake slightly; to push suddenly but slightly, so as to cause to shake or totter; to jostle; to jog." },
        { word: "ultimatum", definition: "A final statement of terms or conditions made by one party to another, especially one that expresses a threat of reprisal or war." },
        { word: "cushats", definition: "A pigeon, wood pigeon or ring dove." },
        { word: "engrafting", definition: "To insert, as a scion of one tree or plant into another, for the purpose of propagation; graft onto a plant" },
        { word: "dunned", definition: "To ask or beset a debtor for payment." },
        { word: "seamanship", definition: "Skill in, and knowledge of, the work of navigating, maintaining, and operating a vessel." },
        { word: "externally", definition: "On the surface or the outside" },
        { word: "reamed", definition: "To cream; mantle; foam; froth." },
        { word: "swob", definition: "A small piece of soft, absorbent material, such as gauze, used to clean wounds, apply medicine, or take samples of body fluids. Often attached to a stick or wire to aid access." },
        { word: "squills", definition: "A European bulbous liliaceous plant, of the genus Scilla, used in medicine for its acrid, expectorant, diuretic, and emetic properties" },
        { word: "bodyboards", definition: "A piece of foam, usually rectangular in shape, upon which one sits or lies when bodyboarding." },
        { word: "hatchway", definition: "A means of passing through a wall or floor, having a hatch (especially on a ship); a doorway with a hatch rather than a door." },
        { word: "pedicles", definition: "A fleshy line used to attach and anchor brachiopods and some bivalve molluscs to a substrate." },
        { word: "trans", definition: "To cross from one side to another of (gender, sex or something in that vein)." },
        { word: "psychosocial", definition: "(of behaviour) having both psychological and social aspects" },
        { word: "arraign", definition: "Arraignment." },
        { word: "dogfight", definition: "A twisting turning battle between two or more military aircraft, especially between fighters." },
        { word: "replevin", definition: "An action to recover personal property unlawfully taken, especially that seized by way of distraint; The writ or procedure of such action." },
        { word: "fistic", definition: "Of or pertaining to boxing or fighting with fists." },
        { word: "jiffy", definition: "A very short, unspecified length of time." },
        { word: "autologous", definition: "Derived from part of the same individual (i.e. from the recipient rather than a different donor)." },
        { word: "kelt", definition: "A thin, recently spawned Atlantic salmon." },
        { word: "resources", definition: "Something that one uses to achieve an objective, e.g. raw materials or personnel." },
        { word: "tuberoses", definition: "A Mexican tuberous plant (Polianthes tuberosa) that has white flowers and grass-like leaves, used in perfumery." },
        { word: "hebephrenia", definition: "A type of mental disorder occurring during puberty." },
        { word: "omitted", definition: "To leave out or exclude." },
        { word: "loganberry", definition: "A hybrid berry, produced by crossing a raspberry with a blackberry, considered a species Rubus loganobaccus, a variety Rubus ursinus var. loganobaccus, or a nothospecies Rubus × loganobaccus." },
        { word: "shrivel", definition: "To collapse inward; to crumble." },
        { word: "occulted", definition: "To cover or hide from view." },
        { word: "reconstructing", definition: "To construct again; to restore." },
        { word: "validations", definition: "The act of validating something." },
        { word: "laid", definition: "(of paper) Marked with parallel lines, as if ribbed, from wires in the mould." },
        { word: "merchantable", definition: "Fit for the market, i.e. suitable for selling for an ordinary price. Sometimes, this is a technical designation for a particular kind or class." },
        { word: "bickers", definition: "To quarrel in a tiresome, insulting manner." },
        { word: "indecorous", definition: "Improper, immodest or indecent" },
        { word: "besmeared", definition: "To smear over; smear all over; sully." },
        { word: "quacks", definition: "The sound made by a duck." },
        { word: "adjunctive", definition: "(grammar) a connector joining two components of the same weight, such as a coordinating conjunction" },
        { word: "vapor", definition: "Cloudy diffused matter such as mist, steam or fumes suspended in the air." },
        { word: "liberties", definition: "The condition of being free from control or restrictions." },
        { word: "strips", definition: "The act of removing one's clothes; a striptease." },
        { word: "tunicate", definition: "Any of very many chordate marine animals, of the subphyla Tunicata or Urochordata, including the sea squirts." },
        { word: "kenaf", definition: "Hibiscus cannabinus, an annual or biennial herbaceous plant found mainly in Asia." },
        { word: "graptolite", definition: "Any of a group of extinct aquatic colonial invertebrates, of the class Graptolithina, from the Cambrian and Carboniferous periods." },
        { word: "feminity", definition: "Femininity." },
        { word: "rebind", definition: "To bind again." },
        { word: "pseudos", definition: "An intellectually pretentious person; a pseudointellectual." },
        { word: "inferred", definition: "To introduce (something) as a reasoned conclusion; to conclude by reasoning or deduction, as from premises or evidence." },
        { word: "pareos", definition: "A wraparound garment, worn by men or women, similar to a Malaysian sarong." },
        { word: "reflexology", definition: "The study and interpretation of behavior in terms of simple and complex reflexes." },
        { word: "tyrant", definition: "A usurper; one who gains power and rules extralegally, distinguished from kings elevated by election or succession." },
        { word: "musicology", definition: "The scholarly or scientific study of music, as in historical research, musical theory, or the physical nature of sound." },
        { word: "reheels", definition: "To fit (a shoe, stocking, etc.) with a replacement heel." },
        { word: "subjunctive", definition: "A form in the subjunctive mood." },
        { word: "mackintosh", definition: "A waterproof long coat made of rubberized cloth." },
        { word: "albums", definition: "A book specially designed to keep photographs, stamps, or autographs." },
        { word: "ersatz", definition: "Something made in imitation; an effigy or substitute" },
        { word: "survivals", definition: "The fact or act of surviving; continued existence or life." },
        { word: "finalist", definition: "Somebody or something that appears in the final stage of a competition." },
        { word: "wisecrack", definition: "A witty or sarcastic comment or quip." },
        { word: "yellowfin", definition: "Any of various fish with yellow fins." },
        { word: "stranglehold", definition: "A grip or control so strong as to stifle or cut off." },
        { word: "eventuality", definition: "A possible event; something that may happen." },
        { word: "optimizing", definition: "(originally intransitive) To act optimistically or as an optimist." },
        { word: "unnatural", definition: "Not natural." },
        { word: "fodders", definition: "Food for animals; that which is fed to cattle, horses, and sheep, such as hay, cornstalks, vegetables, etc." },
        { word: "flankers", definition: "A player who plays in the back row of the scrum." },
        { word: "disagreement", definition: "An argument or debate." },
        { word: "daunorubicin", definition: "A particular anthracycline drug used in chemotherapy." },
        { word: "piques", definition: "A feeling of enmity; ill-feeling, animosity; a transient feeling of wounded pride." },
        { word: "novas", definition: "Any sudden brightening of a previously inconspicuous star." },
        { word: "theriacs", definition: "A supposed universal antidote against poison, especially snake venom; specifically, one such developed in the 1st century as an improvement on mithridate." },
        { word: "grumps", definition: "A habitually grumpy or complaining person." },
        { word: "nucleotides", definition: "The monomer constituting DNA or RNA biopolymer molecules. Each nucleotide consists of a nitrogenous heterocyclic base (or nucleobase), which can be either a double-ringed purine or a single-ringed pyrimidine; a five-carbon pentose sugar (deoxyribose in DNA or ribose in RNA); and a phosphate group." },
        { word: "marauders", definition: "Someone who moves about in roving fashion looking for plunder." },
        { word: "winter", definition: "Traditionally the fourth of the four seasons, typically regarded as being from December 23 to March 20 in continental regions of the Northern Hemisphere or the months of June, July and August in the Southern Hemisphere. It is the time when the sun is lowest in the sky, resulting in short days, and the time of year with the lowest atmospheric temperatures for the region." },
        { word: "harmonies", definition: "Agreement or accord." },
        { word: "postulants", definition: "A person seeking admission to a religious order" },
        { word: "antagonists", definition: "An opponent or enemy." },
        { word: "lambing", definition: "Of a sheep, to give birth." },
        { word: "monometallic", definition: "Consisting of a single metal." },
        { word: "blastoderm", definition: "The germination point in an ovum from which the embryo develops." },
        { word: "coquets", definition: "A flirtatious female; a coquette." },
        { word: "rudderless", definition: "Without a rudder." },
        { word: "poltroon", definition: "An ignoble or total coward; a dastard; a mean-spirited wretch." },
        { word: "hysterectomized", definition: "To perform a hysterectomy upon." },
        { word: "insanity", definition: "The state of being insane; madness." },
        { word: "monotheism", definition: "The belief in a single deity (one god or goddess); especially within an organized religion." },
        { word: "strobilae", definition: "The jointed series of segments of the body of a tapeworm, posterior to the unjointed collum." },
        { word: "kayaks", definition: "A type of small boat, covered over by a surface deck, powered by the occupant or occupants using a double-bladed paddle in a sitting position, from a hole in the surface deck" },
        { word: "squireens", definition: "(originally Ireland) A minor squire; a small landowner." },
        { word: "dabbled", definition: "To make slightly wet or soiled by spattering or sprinkling a liquid (such as water, mud, or paint) on it; to bedabble." },
        { word: "canonesses", definition: "A woman who holds a canonry in a conventual chapter." },
        { word: "kopje", definition: "A small hill or mound (especially on the African veld)." },
        { word: "pardoner", definition: "One who pardons." },
        { word: "run", definition: "To run." },
        { word: "glow", definition: "The state of a glowing object." },
        { word: "disorientated", definition: "To cause to lose orientation or direction." },
        { word: "piccolos", definition: "An instrument similar to a flute, but smaller, and playing an octave higher." },
        { word: "reactance", definition: "(electrics) The opposition to the change in flow of current in an alternating current circuit, due to inductance and capacitance; the imaginary part of the impedance. Symbol: X." },
        { word: "enjoy", definition: "To receive pleasure or satisfaction from something" },
        { word: "said", definition: "Mentioned earlier; aforesaid." },
        { word: "rekindling", definition: "To kindle again." },
        { word: "successor", definition: "A person or thing that immediately follows another in holding an office or title." },
        { word: "locomotor", definition: "Something that is capable of locomotion." },
        { word: "stereospecific", definition: "Showing stereospecificity." },
        { word: "requisitions", definition: "A formal request for something." },
        { word: "repelled", definition: "To turn (someone) away from a privilege, right, job, etc." },
        { word: "ectoderms", definition: "Outermost of the three tissue layers in the embryo of a metazoan animal. Through development, it will produce the epidermis (skin) and nervous system of the adult." },
        { word: "neutralising", definition: "To make even, inactive or ineffective." },
        { word: "vehicle", definition: "A conveyance; a device for carrying or transporting substances, objects or individuals." },
        { word: "forgave", definition: "To pardon; to waive any negative feeling or desire for punishment, retribution, or compensation." },
        { word: "encompass", definition: "To form a circle around; to encircle." },
        { word: "journeying", definition: "To travel, to make a trip or voyage." },
        { word: "acquittance", definition: "A writing which is evidence of a discharge; a receipt in full, which bars a further demand." },
        { word: "bitters", definition: "(usually in the plural bitters) A liquid or powder, made from bitter herbs, used in mixed drinks or as a tonic." },
        { word: "curveballs", definition: "A forespin pitch thrown by rotating the index and middle fingers down and resulting in motion down 'curve'" },
        { word: "poolroom", definition: "A room with pool tables where pool can be played, usually for a fee." },
        { word: "miserably", definition: "In a miserable manner" },
        { word: "hydriae", definition: "A three-handled clay or metal vessel used in Greek culture to hold and pour water." },
        { word: "squatter", definition: "One who squats, sits down idly." },
        { word: "uveitis", definition: "Inflammation of the uvea" },
        { word: "clamber", definition: "The act of clambering; a difficult or haphazard climb." },
        { word: "baptismal", definition: "A baptismal name: a name given at baptism." },
        { word: "unstinted", definition: "Not constrained, not restrained, or not confined." },
        { word: "rolfed", definition: "To apply the Rolfing massage technique to." },
        { word: "lock", definition: "Something used for fastening, which can only be opened with a key or combination." },
        { word: "pharisaic", definition: "Of or pertaining to the Pharisees." },
        { word: "wisecracked", definition: "To make a sarcastic, flippant, or sardonic comment." },
        { word: "versicle", definition: "In poetry and songs, particularly hymns, one of a series of lines that are shorter than a standard line of verse." },
        { word: "matrons", definition: "A mature or elderly woman." },
        { word: "structure", definition: "A cohesive whole built up of distinct parts." },
        { word: "bankruptcy", definition: "A legally declared or recognized condition of insolvency of a person or organization." },
        { word: "furriest", definition: "Covered with fur, or with something resembling fur." },
        { word: "terce", definition: "The third hour of daylight (about 9 am)." },
        { word: "admixing", definition: "To mingle with something else; to mix." },
        { word: "dissymmetry", definition: "Asymmetry" },
        { word: "manoeuvres", definition: "The planned movement of troops, vehicles etc.; a strategic repositioning; (later also) a large training field-exercise of fighting units." },
        { word: "wattling", definition: "An interwoven mesh of twigs; wattle." },
        { word: "garrulous", definition: "Excessively or tiresomely talkative." },
        { word: "personating", definition: "To fraudulently portray another person; to impersonate." },
        { word: "skirts", definition: "An article of clothing, usually worn by women and girls, that hangs from the waist and covers the lower part of the body." },
        { word: "solely", definition: "Alone; exclusively." },
        { word: "flameouts", definition: "The act of flaming out or burning out; extinguishing." },
        { word: "arrow", definition: "A projectile consisting of a shaft, a point and a tail with stabilizing fins that is shot from a bow." },
        { word: "rarifying", definition: "To make rare, thin, porous, or less dense" },
        { word: "factorage", definition: "The commission paid to a factor" },
        { word: "maharanee", definition: "The wife of a maharajah; approximately, a queen consort." },
        { word: "granites", definition: "A group of igneous and plutonic rocks composed primarily of feldspar and quartz. Usually contains one or more dark minerals, which may be mica, pyroxene, or amphibole. Granite is quarried for building stone, road gravel, decorative stone, and tombstones. Common colors are gray, white, pink, and yellow-brown." },
        { word: "shouted", definition: "To utter a sudden and loud cry, as in joy, triumph, exultation or anger, or to attract attention, to animate others, etc." },
        { word: "reorientate", definition: "To orientate anew; to cause to face a different direction." },
        { word: "pipetted", definition: "To transfer or measure the volume of a liquid using a pipette." },
        { word: "osteitis", definition: "Inflammation of bone" },
        { word: "sploshed", definition: "To make a heavy splashing sound." },
        { word: "clenches", definition: "To grip or hold fast." },
        { word: "tittivate", definition: "To make small improvements or alterations to (one's appearance etc.); to add some finishing touches to." },
        { word: "implosion", definition: "The inrush of air in forming a suction stop." },
        { word: "bouillabaisse", definition: "A type of fish soup or stew from Provence, France." },
        { word: "spiderwebs", definition: "The net-like construct of a spider containing sticky strands to catch prey." },
        { word: "wurst", definition: "A German- or Austrian-style sausage." },
        { word: "aviates", definition: "To operate an aircraft." },
        { word: "incurred", definition: "To bring upon oneself or expose oneself to, especially something inconvenient, harmful, or onerous; to become liable or subject to" },
        { word: "pealing", definition: "To sound with a peal or peals." },
        { word: "shoveler", definition: "One who, or that which, shovels." },
        { word: "biochemical", definition: "A chemical substance derived from a biological source" },
        { word: "damnatory", definition: "Containing a sentence of condemnation." },
        { word: "equipoises", definition: "To act or make to act as an equipoise." },
        { word: "babysitting", definition: "To watch or tend someone else's child for a period of time, often for money." },
        { word: "sodomite", definition: "One who practices sodomy; a sodomist." },
        { word: "tone", definition: "A specific pitch." },
        { word: "med", definition: "(chiefly in the plural) Medications, especially prescribed psychoactive medications." },
        { word: "ingraft", definition: "To insert, as a scion of one tree or plant into another, for the purpose of propagation; graft onto a plant" },
        { word: "figural", definition: "Representing by means of a figure; emblematic." },
        { word: "conkers", definition: "A horse chestnut, used in the game of conkers." },
        { word: "defrauding", definition: "To obtain money or property from (a person) by fraud; to swindle." },
        { word: "oersteds", definition: "The CGS unit of magnetizing field (symbol Oe), defined as 1000/4π (≈79.5774715) amperes per meter of flux path." },
        { word: "disfiguring", definition: "Change the appearance of something/someone to the negative." },
        { word: "soupspoons", definition: "A spoon for eating soup, characterised by having a round bowl rather than the usual oval bowl of other types of spoon." },
        { word: "queers", definition: "(sometimes derogatory) A person who is or appears homosexual, or who has homosexual qualities." },
        { word: "amoretto", definition: "(in art) A cupid or putto (representation of a naked baby or small child, often with wings)." },
        { word: "depriving", definition: "To take something away from (someone) and keep it away; to deny someone something." },
        { word: "bannocks", definition: "An unleavened bread made with barley, wheat, or oatmeal." },
        { word: "consistencies", definition: "Local coherence." },
        { word: "disaccharide", definition: "Any sugar, such as sucrose, maltose and lactose, consisting of two monosaccharides combined together." },
        { word: "rondeaux", definition: "A fixed form of verse based on two rhyme sounds and consisting usually of 13 lines in three stanzas with the opening words of the first line of the first stanza used as an independent refrain after the second and third stanzas." },
        { word: "touche", definition: "An acknowledgement of a hit." },
        { word: "distortion", definition: "An act of distorting." },
        { word: "torrefies", definition: "To subject to intense heat; to parch, to roast." },
        { word: "enclose", definition: "To surround with a wall, fence, etc." },
        { word: "eusocial", definition: "Of or pertaining to certain social animals' societies (such as those of ants) in which sterile individuals work for reproductive individuals" },
        { word: "borate", definition: "The oxyanion BO33- or any of several more complex derivatives" },
        { word: "solidi", definition: "A slashing action or motion, particularly:" },
        { word: "bucolics", definition: "A pastoral poem." },
        { word: "pronto", definition: "Quickly, very soon, promptly." },
        { word: "digitalizes", definition: "To digitize, to make digital." },
        { word: "resat", definition: "To take an examination a second time." },
        { word: "inane", definition: "That which is void or empty." },
        { word: "quandongs", definition: "Any of several species of Santalum:" },
        { word: "monotheism", definition: "The belief in a single deity (one god or goddess); especially within an organized religion." },
        { word: "harvestmen", definition: "A field-worker who works to gather in the harvest." },
        { word: "said", definition: "Mentioned earlier; aforesaid." },
        { word: "rimming", definition: "To form a rim on." },
        { word: "employment", definition: "The work or occupation for which one is used, and often paid" },
        { word: "meteoroids", definition: "A relatively small (sand- to boulder-sized) fragment of debris in a star system that produces a meteor when it hits the atmosphere" },
        { word: "routs", definition: "A noise, especially a loud one" },
        { word: "profitably", definition: "In a profitable manner, in a way that achieves profit or gain." },
        { word: "finalist", definition: "Somebody or something that appears in the final stage of a competition." },
        { word: "van", definition: "A covered vehicle used for carrying goods or people, usually roughly cuboid in shape, longer and higher than a car but smaller than a truck/lorry." },
        { word: "lectern", definition: "A stand with a slanted top used to support a bible from which passages are read during a church service." },
        { word: "descended", definition: "To pass from a higher to a lower place; to move downwards; to come or go down in any way, for example by falling, flowing, walking, climbing etc." },
        { word: "telecommutes", definition: "To work from home, sometimes for part of a working day or week, using a computer connected to one's employer's network or via the Internet." },
        { word: "unpublished", definition: "Not published." },
        { word: "ghostwrites", definition: "(authorship) To write under the name of another (especially literary works)." },
        { word: "run", definition: "To run." },
        { word: "vortices", definition: "A whirlwind, whirlpool, or similarly moving matter in the form of a spiral or column." },
        { word: "ferments", definition: "Something, such as a yeast or barm, that causes fermentation." },
        { word: "nervier", definition: "Having nerve; bold; brazen." },
        { word: "landholder", definition: "A person who owns land." },
        { word: "logographs", definition: "A character or symbol that represents a word or phrase." },
        { word: "inamoratas", definition: "A female lover or woman with whom one is in love; a mistress" },
        { word: "curlicue", definition: "A fancy twisting or curling shape usually made from a series of concentric circles." },
        { word: "grateful", definition: "Appreciative; thankful." },
        { word: "server", definition: "A program that provides services to other programs or devices, either in the same computer or over a computer network." },
        { word: "weepers", definition: "A person who weeps." },
        { word: "corselette", definition: "Armor for the body, as, the body breastplate and backpiece taken together." },
        { word: "megaspores", definition: "The larger spore of a heterosporous plant, typically producing a female gametophyte" },
        { word: "intestinal", definition: "Relating to the intestines." },
        { word: "spiderwebs", definition: "The net-like construct of a spider containing sticky strands to catch prey." },
        { word: "acknowledgments", definition: "The act of acknowledging" },
        { word: "cricked", definition: "To develop a crick (cramp, spasm)." },
        { word: "binomial", definition: "A polynomial with two terms." },
        { word: "furriest", definition: "Covered with fur, or with something resembling fur." },
        { word: "proprietress", definition: "A female proprietor." },
        { word: "conversazioni", definition: "A formal gathering where something related to the arts is discussed." },
        { word: "strawflowers", definition: "Any of many Australian plants of the genus Xerochrysum, especially Xerochrysum bracteatum, having deep yellow flowers than can be readily dried." },
        { word: "acknowledgments", definition: "The act of acknowledging" },
        { word: "belaboured", definition: "To labour about; labour over; work hard upon; ply diligently." },
        { word: "manoeuvre", definition: "The planned movement of troops, vehicles etc.; a strategic repositioning; (later also) a large training field-exercise of fighting units." },
        { word: "charismata", definition: "A power or authority, generally of a spiritual nature, believed to be a freely given gift by the grace of God." },
        { word: "reductionists", definition: "An advocate of reductionism." },
        { word: "stringy", definition: "Composed of, or resembling, string or strings." },
        { word: "cladded", definition: "(past tense clad) To clothe." },
        { word: "apsidal", definition: "Of, pertaining to, or in the form of an apse" },
        { word: "landholder", definition: "A person who owns land." },
        { word: "include", definition: "A piece of source code or other content that is dynamically retrieved for inclusion in another item." },
        { word: "canonesses", definition: "A woman who holds a canonry in a conventual chapter." },
        { word: "crinklier", definition: "That crinkles." },
        { word: "asymmetrical", definition: "Not symmetrical." },
        { word: "scamp", definition: "A rascal, swindler, or rogue; a ne'er-do-well." },
        { word: "indult", definition: "A permission or privilege granted by the church authority that excepts an individual from what is otherwise a norm of church law, such as a release from monastic vows." },
        { word: "hematophagous", definition: "Feeding on blood." },
        { word: "rimming", definition: "To form a rim on." },
        { word: "ornithology", definition: "The branch of zoology that deals with the scientific study of birds." },
        { word: "drooping", definition: "To hang downward; to sag." },
        { word: "lands", definition: "The part of Earth which is not covered by oceans or other bodies of water." },
        { word: "dolma", definition: "Any of a family of stuffed vegetable dishes. The filling generally consists of rice, minced meat or grains, together with onion, herbs and spices." },
        { word: "shrivel", definition: "To collapse inward; to crumble." },
        { word: "urtext", definition: "A primitive, seminal, or prototypical example of an artistic genre or the basis of an ideological movement." },
        { word: "outdriven", definition: "To drive a vehicle, etc. farther or better than." },
        { word: "cordate", definition: "Heart-shaped, with a point at the apex and a notch at the base." },
        { word: "wrangled", definition: "To bicker, or quarrel angrily and noisily." },
        { word: "outdriven", definition: "To drive a vehicle, etc. farther or better than." },
        { word: "slogs", definition: "A long, tedious walk, or session of work." },
        { word: "chinquapin", definition: "Any of the trees in the genus Castanopsis." },
        { word: "degreasing", definition: "To remove grease from something." },
        { word: "dishpans", definition: "A large basin or pan with a flat bottom in which dishes are washed." },
        { word: "treehouses", definition: "A house, or similar structure within a tree, or several trees, built with light materials; wood, bamboo or aluminum are preferred construction materials." },
        { word: "awakens", definition: "To cause to become awake." },
        { word: "optimizing", definition: "(originally intransitive) To act optimistically or as an optimist." },
        { word: "spiderwebs", definition: "The net-like construct of a spider containing sticky strands to catch prey." },
        { word: "dolloping", definition: "To apply haphazardly in generous lumps or scoops." },
        { word: "bloodfins", definition: "Aphyocharax anisitsi, a South American characin with blood-red tail and fins." },
        { word: "proprietress", definition: "A female proprietor." },
        { word: "lacquered", definition: "To apply a lacquer to something or to give something a smooth, glossy finish." },
        { word: "slammed", definition: "To shut with sudden force so as to produce a shock and noise." },
        { word: "goat", definition: "A mammal, Capra aegagrus hircus, and similar species of the genus Capra." },
        { word: "sublimated", definition: "To change state from a solid to a gas without passing through the liquid state." },
        { word: "cribwork", definition: "Cribbing (structural members)" },
        { word: "countering", definition: "To contradict, oppose." },
        { word: "revolutionises", definition: "To change radically or significantly, as in a revolution." },
        { word: "dejection", definition: "A state of melancholy or depression; low spirits, the blues." },
        { word: "openhearted", definition: "Frank and candidly straightforward" },
        { word: "kenaf", definition: "Hibiscus cannabinus, an annual or biennial herbaceous plant found mainly in Asia." },
        { word: "hibernations", definition: "A state of inactivity and metabolic depression in animals during winter." },
        { word: "aerograms", definition: "A wireless message." },
        { word: "basis", definition: "A physical base or foundation." },
        { word: "vinified", definition: "To convert the juice of a fruit (especially that of the grape) into wine by fermentation." },
        { word: "merlot", definition: "A dark-blue variety of wine grape." },
        { word: "reran", definition: "To run (a previously broadcast television program) again." },
        { word: "squads", definition: "A group of people organized for some common purpose, usually of about ten members." },
        { word: "thro", definition: "Through" },
        { word: "whored", definition: "To prostitute oneself." },
        { word: "phreak", definition: "A person who engages in phone phreaking." },
        { word: "stales", definition: "Something stale; a loaf of bread or the like that is no longer fresh." },
        { word: "crowdy", definition: "A thick gruel of oatmeal and milk or water." },
        { word: "catechisms", definition: "A book, in question and answer form, summarizing the basic principles of Christianity." },
        { word: "disposing", definition: "(used with 'of') To eliminate or to get rid of something." },
        { word: "nondrip", definition: "Designed not to drip." },
        { word: "blinders", definition: "Something that blinds." },
        { word: "capacitated", definition: "To make capable of functioning in a given capacity." },
        { word: "colostomy", definition: "An incision into the colon to allow for drainage; the opening produced in such incision." },
        { word: "histone", definition: "Any of various simple water-soluble proteins that are rich in the basic amino acids lysine and arginine and are complexed with DNA in the nucleosomes of eukaryotic chromatin." },
        { word: "staples", definition: "A town containing merchants who have exclusive right, under royal authority, to purchase or produce certain goods for export; also, the body of such merchants seen as a group." },
        { word: "transplanting", definition: "To uproot (a growing plant), and plant it in another place." },
        { word: "berthed", definition: "To bring (a ship or vehicle) into its berth" },
        { word: "bound", definition: "To tie; to confine by any ligature." },
        { word: "peculating", definition: "To embezzle" },
        { word: "desiccation", definition: "The state or process of being desiccated" },
        { word: "incomparable", definition: "Something beyond compare; a thing with which there is no comparison." },
        { word: "ulus", definition: "An all-purpose knife traditionally used by Yup'ik, Inuit, and Aleut women." },
        { word: "vapor", definition: "Cloudy diffused matter such as mist, steam or fumes suspended in the air." },
        { word: "naw", definition: "Pronunciation spelling of no." },
        { word: "blotchy", definition: "Covered in blotches." },
        { word: "riding", definition: "To transport oneself by sitting on and directing a horse, later also a bicycle etc." },
        { word: "gratuities", definition: "Something (usually money) given in exchange for influence or as an inducement to dishonesty." },
        { word: "whiney", definition: "Whining; tending to whine or complain." },
        { word: "renegaded", definition: "To desert one's cause, or change one's loyalties; to commit betrayal." },
        { word: "redialing", definition: "To dial again" },
        { word: "bodyboards", definition: "A piece of foam, usually rectangular in shape, upon which one sits or lies when bodyboarding." },
        { word: "begun", definition: "To start, to initiate or take the first step into something." },
        { word: "furors", definition: "A general uproar or commotion" },
        { word: "drooping", definition: "To hang downward; to sag." },
        { word: "repose", definition: "Rest; sleep." },
        { word: "resurfacing", definition: "To come once again to the surface" },
        { word: "mills", definition: "A grinding apparatus for substances such as grains, seeds, etc." },
        { word: "sacs", definition: "A bag or pouch inside a plant or animal that typically contains a fluid." },
        { word: "dolloping", definition: "To apply haphazardly in generous lumps or scoops." },
        { word: "redialing", definition: "To dial again" },
        { word: "clasping", definition: "To take hold of; to grasp; to grab tightly." },
        { word: "gutsy", definition: "Marked by courage and determination in the face of difficulties or danger; having guts" },
        { word: "sarongs", definition: "A garment made of a length of printed cloth wrapped about the waist that is commonly worn by men and women in Malaysia, Sri Lanka, India, Indonesia, and the Pacific islands." },
        { word: "insecure", definition: "Not secure." },
        { word: "deeding", definition: "To transfer real property by deed." },
        { word: "redundancies", definition: "The state of being redundant" },
        { word: "imprison", definition: "To put in or as if in prison; confine." },
        { word: "proceeded", definition: "To move, pass, or go forward or onward; to advance; to carry on" },
        { word: "damnatory", definition: "Containing a sentence of condemnation." },
        { word: "troops", definition: "(collective) A collection of people; a number; a multitude (in general)." },
        { word: "porting", definition: "To turn or put to the left or larboard side of a ship; said of the helm." },
        { word: "rosed", definition: "To make rose-coloured; to redden or flush." },
        { word: "afreets", definition: "(Islamic mythology) a kind of djinn mentioned in the Qur'an." },
        { word: "granites", definition: "A group of igneous and plutonic rocks composed primarily of feldspar and quartz. Usually contains one or more dark minerals, which may be mica, pyroxene, or amphibole. Granite is quarried for building stone, road gravel, decorative stone, and tombstones. Common colors are gray, white, pink, and yellow-brown." },
        { word: "solidi", definition: "A slashing action or motion, particularly:" },
        { word: "bitters", definition: "(usually in the plural bitters) A liquid or powder, made from bitter herbs, used in mixed drinks or as a tonic." },
        { word: "bundlers", definition: "A machine that bundles." },
        { word: "cladded", definition: "(past tense clad) To clothe." },
        { word: "gut", definition: "The alimentary canal, especially the intestine." },
        { word: "ingrate", definition: "An ungrateful person" },
        { word: "biddable", definition: "Docile, amenable or compliant." },
        { word: "admixing", definition: "To mingle with something else; to mix." },
        { word: "joust", definition: "A tilting match: a mock combat between two mounted knights or men-at-arms using lances in the lists or enclosed field." },
        { word: "overstocking", definition: "To stock to an excessive degree." },
        { word: "crinklier", definition: "That crinkles." },
        { word: "colostomy", definition: "An incision into the colon to allow for drainage; the opening produced in such incision." },
        { word: "haulms", definition: "The stems of various cultivated plants, left after harvesting the crop to be used as animal litter or for thatching." },
        { word: "overstocking", definition: "To stock to an excessive degree." },
        { word: "lenient", definition: "A lenitive; an emollient." },
        { word: "dunned", definition: "To ask or beset a debtor for payment." },
        { word: "reorientate", definition: "To orientate anew; to cause to face a different direction." },
        { word: "reentrance", definition: "A second or subsequent entrance; the act of reentering" },
        { word: "kinswomen", definition: "A female relative." },
        { word: "honor", definition: "Recognition of importance or value; respect; veneration (of someone, usually for being morally upright or successful)" },
        { word: "morale", definition: "The capacity of people to maintain belief in an institution or a goal, or even in oneself and others." },
        { word: "sunlamps", definition: "A lamp that produces ultraviolet radiation; used for therapeutic or cosmetic purposes." },
        { word: "curated", definition: "To act as a curator for." },
        { word: "thronging", definition: "To crowd into a place, especially to fill it." },
        { word: "caroms", definition: "(cue sports, especially billiards) A shot in which the ball struck with the cue comes in contact with two or more balls on the table; a hitting of two or more balls with the player's ball." },
        { word: "marrowbone", definition: "A bone containing edible marrow." },
        { word: "comminuted", definition: "To pulverize; to smash." },
        { word: "videocassettes", definition: "A cassette containing blank or recorded videotape; either in VHS or Betamax format." },
        { word: "awl", definition: "A pointed instrument for piercing small holes, as in leather or wood; used by shoemakers, saddlers, cabinetmakers, etc. The blade is differently shaped and pointed for different uses, as in the brad awl, saddler's awl, shoemaker's awl, etc." },
        { word: "assignments", definition: "The act of assigning; the allocation of a job or a set of tasks." },
        { word: "treason", definition: "The crime of betraying one’s own country." },
        { word: "unartistic", definition: "Not artistic." },
        { word: "bract", definition: "A leaf or leaf-like structure from the axil out of which a stalk of a flower or an inflorescence arises." },
        { word: "pachuco", definition: "A Mexican-American, especially a juvenile delinquent in the Los Angeles area." },
        { word: "jockstrap", definition: "An athletic supporter worn by men to support the genitals during strenuous exercise." },
        { word: "heteronym", definition: "A word having the same spelling as another, but a different pronunciation and meaning." },
        { word: "stye", definition: "A bacterial infection in the eyelash or eyelid." },
        { word: "platitudinous", definition: "Characterised by clichés or platitudes." },
        { word: "oropharynx", definition: "The oral part of the pharynx, reaching from the uvula to the level of the hyoid bone." },
        { word: "peridots", definition: "A transparent olive-green form of olivine, used as a gem." },
        { word: "oospheres", definition: "A large nonmotile egg cell formed in an oogonium and ready for fertilization" },
        { word: "runoffs", definition: "That portion of precipitation or irrigation on an area which does not infiltrate or evaporate, but instead is discharged from the area." },
        { word: "binoculars", definition: "A hand-held device consisting of a series of lenses and prisms, used to magnify objects so that they can be better seen from a distance, and looked at through both eyes." },
        { word: "apraxia", definition: "Total or partial loss of the ability to perform coordinated movements or manipulate objects in the absence of motor or sensory impairment; specifically, a disorder of motor planning." },
        { word: "yellower", definition: "Having yellow as its colour." },
        { word: "mongrelizing", definition: "To breed a mongrel" },
        { word: "hoarsened", definition: "To make or become hoarse." },
        { word: "quadrats", definition: "An area of land, marked for studying its plants, animals, soil, natural processes, etc." },
        { word: "among", definition: "Denotes a mingling or intermixing with distinct or separable objects. (See Usage Note at amidst.)" },
        { word: "octupling", definition: "To increase eightfold." },
        { word: "subcontinent", definition: "A large landmass which is either smaller than a continent (such as Greenland), or part of an even larger continent (such as the Indian subcontinent)." },
        { word: "disagree", definition: "To fail to agree; to have a different opinion or belief." },
        { word: "wormhole", definition: "A hole burrowed by a worm" },
        { word: "unboxes", definition: "To remove from a box." },
        { word: "rapidest", definition: "Very swift or quick." },
        { word: "books", definition: "A collection of sheets of paper bound together to hinge at one edge, containing printed or written material, pictures, etc." },
        { word: "solvents", definition: "A liquid that dissolves a solid, liquid, or gaseous solute, resulting in a solution." },
        { word: "gliomata", definition: "A tumour that arises from glial cells in the brain or spinal cord" },
        { word: "drives", definition: "Motivation to do or achieve something; ability coupled with ambition." },
        { word: "cineasts", definition: "An enthusiast of film and the cinema." },
        { word: "mitogens", definition: "Any substance that stimulates mitosis" },
        { word: "smiled", definition: "To have (a smile) on one's face." },
        { word: "ergs", definition: "The unit of work or energy, being the amount of work done by a force of one dyne applied through a distance of one centimeter. Equal to 10−7 joules." },
        { word: "sanitizes", definition: "To rid of microorganisms by cleaning or disinfecting." },
        { word: "legitimated", definition: "To make legitimate, lawful, or valid; especially, to put in the position or state of a legitimate person before the law, by legal means." },
        { word: "strobes", definition: "A stroboscopic lamp: a device used to produce regular flashes of light." },
        { word: "coronary", definition: "Any of the coronary vessels; a coronary artery or coronary vein." },
        { word: "farad", definition: "In the International System of Units, the derived unit of electrical capacitance; the capacitance of a capacitor in which one coulomb of charge causes a potential difference of one volt across the capacitor. Symbol: F" },
        { word: "soles", definition: "A wooden band or yoke put around the neck of an ox or cow in the stall." },
        { word: "understrappers", definition: "Any underling or inferior in office." },
        { word: "aeroplane", definition: "A powered heavier-than-air aircraft with fixed wings." },
        { word: "weaponry", definition: "Weapons, collectively" },
        { word: "subregion", definition: "A region that is part of a larger region." },
        { word: "knockers", definition: "A device, usually hinged with a striking plate, used for knocking on a door." },
        { word: "mazurkas", definition: "A Polish folk dance in triple time, usually moderately fast, containing a heavy accent on the third beat and occasionally the second beat." },
        { word: "fellowships", definition: "A company of people that share the same interest or aim." },
        { word: "grannies", definition: "A grandmother." },
        { word: "boranes", definition: "Any binary compound of boron and hydrogen." },
        { word: "itemize", definition: "To state in items, or by particulars" },
        { word: "musquash", definition: "The muskrat, Ondatra zibethicus." },
        { word: "housefather", definition: "The father of a family; the male head of household, or of any collection of persons living as a family or in common, as in a primative community." },
        { word: "tremulous", definition: "Trembling, quivering, or shaking." },
        { word: "cupule", definition: "Any small structure shaped like a cup, such as at the base of an acorn, or the sucker on the feet of some flies" },
        { word: "rarest", definition: "Very uncommon; scarce." },
        { word: "antidiarrheal", definition: "A substance or drug having such capabilities." },
        { word: "ascidian", definition: "Any member of the class Ascidiacea (the sea squirts)" },
        { word: "schematic", definition: "A simplified line drawing used by scientists, engineers, technologists and others to illustrate a system at an abstract level. Schematic drawings often use standard symbols for clarity." },
        { word: "tomtit", definition: "Petroica macrocephala, the miromiro or New Zealand tit, a bird of the Petroicidae (Australasian robin) family." },
        { word: "sapodillas", definition: "Manilkara zapota, a long-lived evergreen tree native to the New World tropics." },
        { word: "charr", definition: "One of the several species of fishes of the genus Salvelinus." },
        { word: "cellblock", definition: "A wing of a prison containing cells for the inmates." },
        { word: "noes", definition: "A negating expression; an answer that shows disagreement or disapproval" },
        { word: "polynomial", definition: "(strict sense) An expression consisting of a sum of a finite number of terms, each term being the product of a constant coefficient and one or more variables raised to a non-negative integer power, such as a_n x^n + a_{n-1}x^{n-1} + ... + a_0 x^0." },
        { word: "arrange", definition: "To set up; to organize; to put into an orderly sequence or arrangement." },
        { word: "localisms", definition: "A linguistic feature that is unique to a locality" },
        { word: "proteinuria", definition: "The presence of protein in the urine" },
        { word: "okapis", definition: "A large ruminant mammal, Okapia johnstoni, found in the rainforests of the Congo, related to the giraffe, but with a much shorter neck, a reddish brown coat and zebra-like stripes on its hindquarters." },
        { word: "frumpier", definition: "Dowdy, unkempt, or unfashionable." },
        { word: "geopolitics", definition: "The study of the effects of geography (especially economic geography) on international politics." },
        { word: "assimilator", definition: "A person or thing which assimilates." },
        { word: "insured", definition: "To make a pledge to (someone); to promise, guarantee (someone of something); to assure." },
        { word: "resonates", definition: "To vibrate or sound, especially in response to another vibration." },
        { word: "cerulean", definition: "(color) A greenish-blue color." },
        { word: "twitch", definition: "Couch grass (Elymus repens; a species of grass, often considered as a weed)" },
        { word: "productive", definition: "Capable of producing something, especially in abundance; fertile." },
        { word: "fiddler", definition: "One who plays the fiddle." },
        { word: "shoot", definition: "The emerging stem and embryonic leaves of a new plant." },
        { word: "trophic", definition: "Of or pertaining to nutrition." },
        { word: "tellurian", definition: "An inhabitant of the Earth." },
        { word: "lixiviates", definition: "To separate (a substance) into soluble and insoluble components through percolation; to leach." },
        { word: "sophies", definition: "A title of a Safavid dynasty shah." },
        { word: "inhered", definition: "To be inherent; to be an essential or intrinsic part of; to be fixed or permanently incorporated with something" },
        { word: "outfoxes", definition: "To beat in a competition of wits" },
        { word: "sappier", definition: "Excessively sweet, emotional, nostalgic; cheesy; mushy. (British equivalent: soppy)" },
        { word: "localizes", definition: "To make local; to fix in, or assign to, a definite place." },
        { word: "vivacious", definition: "Lively and animated; full of life and energy." },
        { word: "backspaces", definition: "The key on a typewriter that moves the head one position backwards." },
        { word: "minkes", definition: "A minke whale, one of two species of baleen whales within Balaenoptera, the northern-dwelling species of which is often seen in coastal waters." },
        { word: "supinator", definition: "Any muscle that aids supination" },
        { word: "subunits", definition: "Any subdivision of a larger unit." },
        { word: "pectens", definition: "The bones in the hand between the wrist and the fingers." },
        { word: "cartridge", definition: "The package consisting of the bullet, primer, and casing containing gunpowder; a round of ammunition." },
        { word: "nocturn", definition: "The night office of the Christian liturgy of the Hours, such as is performed in monasteries." },
        { word: "faugh", definition: "An exclamation of contempt, or of disgust, especially for a smell." },
        { word: "canvassing", definition: "The act of one who canvasses or solicits." },
        { word: "repudiation", definition: "The act of refusing to accept; the act of repudiating." },
        { word: "normative", definition: "Of or pertaining to a norm or standard." },
        { word: "ointment", definition: "A viscous preparation of oils and/or fats, usually containing medication, used as a treatment or as an emollient." },
        { word: "gambadoes", definition: "(usually plural) Either of a pair of protective leather gaiters on a saddle." },
        { word: "crucibles", definition: "A cup-shaped piece of laboratory equipment used to contain chemical compounds when heating them to very high temperatures." },
        { word: "lender", definition: "One who lends, especially money; specifically, a bank or other entity that specializes in granting loans." },
        { word: "washouts", definition: "An appliance designed to wash something out." },
        { word: "pitman", definition: "(plural 'pitmen') One who works in a pit, as in mining, in sawing timber, etc." },
        { word: "sinuosities", definition: "The property of being sinuous." },
        { word: "carbonizes", definition: "To turn something to carbon, especially by heating it; to scorch or blacken." },
        { word: "forgivable", definition: "Able to be forgiven; excusable." },
        { word: "mated", definition: "To put the king of an opponent into checkmate." },
        { word: "wineskins", definition: "A bag, traditionally made from the skin of a goat, used for holding and dispensing wine." },
        { word: "line", definition: "A path through two or more points (compare ‘segment’); a continuous mark, including as made by a pen; any path, curved or straight." },
        { word: "audiotapes", definition: "A magnetic tape that stores analog sound for later playback on a tape player." },
        { word: "swooning", definition: "To faint, to lose consciousness." },
        { word: "airiest", definition: "Consisting of air." },
        { word: "portieres", definition: "A car door." },
        { word: "disrupters", definition: "Someone or something that disrupts." },
        { word: "motivators", definition: "Agent noun of motivate; one who motivates." },
        { word: "vitellus", definition: "The contents or substance of the ovum; egg yolk." },
        { word: "perennially", definition: "Year after year (literally: each year)" },
        { word: "fairly", definition: "(manner) In a fair manner; fair; not biased or skewed or favouring a certain party" },
        { word: "swooning", definition: "To faint, to lose consciousness." },
        { word: "myeloma", definition: "A malignant tumour arising from cells of the bone marrow, specifically plasma cells." },
        { word: "mehndi", definition: "Henna (substance used for colouring)" },
        { word: "crepons", definition: "A thin fabric made from silk or fine wool" },
        { word: "instills", definition: "To cause a quality to become part of someone's nature." },
        { word: "deadbolts", definition: "The part of the lock which is moved when the key is engaged." },
        { word: "basset", definition: "The edge of a geological stratum at the surface of the ground; the outcrop." },
        { word: "beastliest", definition: "Pertaining to, or having the form, nature or habits of, a beast." },
        { word: "intercede", definition: "To plead on someone else's behalf." },
        { word: "smolts", definition: "A young salmon two or three years old, when it has acquired its silvery color." },
        { word: "megabucks", definition: "A million dollars." },
        { word: "defrosted", definition: "To remove frost from." },
        { word: "occurrence", definition: "An actual instance when a situation occurs; an event or happening." },
        { word: "discoverable", definition: "Able to be discovered." },
        { word: "regains", definition: "To get back; to recover possession of." },
        { word: "farther", definition: "To help forward; to assist." },
        { word: "ashcans", definition: "A container for ashes, used in times past for accumulating ashes generated from wood and coal fires, for eventual disposal elsewhere. A dustbin." },
        { word: "cerci", definition: "Structures on the end of on the end of the abdomen of most insects, sometimes long, hairlike sensory organs and sometimes smaller and rigid." },
        { word: "ora", definition: "A mouth; an opening." },
        { word: "lozenges", definition: "(shapes) A quadrilateral with sides of equal length (rhombus), having two acute and two obtuse angles." },
        { word: "cardoons", definition: "Cynara cardunculus, a prickly perennial plant related to the artichoke which has leaf stalks eaten as a vegetable." },
        { word: "yacked", definition: "To talk, particularly informally but persistently; to chatter or prattle." },
        { word: "longes", definition: "A long rope or flat web line, more commonly referred to as a longe line, approximately 20-30 feet long, attached to the bridle, longeing cavesson, or halter of a horse and used to control the animal while longeing." },
        { word: "remaster", definition: "To produce a new version of a recording by remixing the original master recordings." },
        { word: "relater", definition: "One who relates, or tells; a relater or narrator." },
        { word: "chequer", definition: "One who checks or verifies something." },
        { word: "bitstreams", definition: "A stream of bits (binary digits)." },
        { word: "inputting", definition: "To put in; put on." },
        { word: "lasts", definition: "To perform, carry out." },
        { word: "troublemaker", definition: "One who causes trouble, especially one who does so deliberately." },
        { word: "dispraised", definition: "To notice with disapprobation or some degree of censure; to disparage, to criticize." },
        { word: "hallmarking", definition: "To provide or stamp with a hallmark." },
        { word: "unworthier", definition: "Not worthy; lacking value or merit; worthless." },
        { word: "jammed", definition: "To get something stuck in a confined space." },
        { word: "juggernauts", definition: "A literal or metaphorical force or object regarded as unstoppable, that will crush all in its path." },
        { word: "replenishes", definition: "To refill; to renew; to supply again or to add a fresh quantity to." },
        { word: "bemoaning", definition: "To moan or complain about (something)." },
        { word: "illite", definition: "A micaceous phyllosilicate clay mineral with aggregates of grey or white monoclinic crystals." },
        { word: "biostratigraphy", definition: "The study of the stratigraphic distribution of fossils." },
        { word: "hungrier", definition: "Affected by hunger; desiring of food; having a physical need for food." },
        { word: "farsighted", definition: "Unable to focus with one's eyes on near objects; presbyopic." },
        { word: "paralyzes", definition: "The complete loss of voluntary control of part of a person's body, such as one or more limbs." },
        { word: "microfossils", definition: "A microscopic fossil" },
        { word: "cuprite", definition: "A mineral composed of cuprous oxide and a minor ore of copper." },
        { word: "epigene", definition: "Foreign; unusual; not natural to the substance in which it was found." },
        { word: "reposals", definition: "The act or state of reposing." },
        { word: "nucleophilic", definition: "Of, or relating to a nucleophile" },
        { word: "quirk", definition: "An idiosyncrasy; a slight glitch, mannerism; something unusual about the manner or style of something or someone" },
        { word: "correlation", definition: "A reciprocal, parallel or complementary relationship between two or more comparable objects." },
        { word: "promptbook", definition: "An annotated copy of a script used by a prompter" },
        { word: "pep", definition: "Energy, high spirits." },
        { word: "conidia", definition: "A fungal spore produced asexually in a conidiophore." },
        { word: "disrupted", definition: "To throw into confusion or disorder." },
        { word: "punches", definition: "A hit or strike with one's fist." },
        { word: "spicy", definition: "Of, pertaining to, or containing spice." },
        { word: "skirling", definition: "To make a shrill sound, as of bagpipes." },
        { word: "aestheticized", definition: "To make aesthetic; to show something at its best, most pleasing or most artistic." },
        { word: "wiseguys", definition: "One who is insolent or flippant; one who makes jokes or perpetrates pranks." },
        { word: "brow", definition: "The ridge over the eyes; the eyebrow." },
        { word: "dastardly", definition: "In the manner of a dastard; marked by cowardice; pusillanimous" },
        { word: "sigmate", definition: "Shaped like the Greek letter sigma" },
        { word: "portages", definition: "An act of carrying, especially the carrying of a boat overland between two waterways." },
        { word: "derivative", definition: "Something derived." },
        { word: "scanner", definition: "A device which scans documents in order to convert them to a digital medium." },
        { word: "tenderer", definition: "Sensitive or painful to the touch." },
        { word: "thymocytes", definition: "A lymphocyte, produced in the thymus, that develops into a T cell" },
        { word: "manage", definition: "The act of managing or controlling something." },
        { word: "pinny", definition: "A sleeveless dress, often similar to an apron, generally worn over other clothes." },
        { word: "finesses", definition: "To evade (a problem, situation, etc.) by using some clever argument or strategem." },
        { word: "grayer", definition: "Having a color somewhere between white and black, as the ash of an ember." },
        { word: "other", definition: "An other, another (person, etc), more often rendered as another." },
        { word: "downy", definition: "Having down, covered with a soft fuzzy coating as of small feathers or hair." },
        { word: "cheetahs", definition: "A distinctive member (Acinonyx jubatus) of the cat family, slightly smaller than the leopard, but with proportionately longer limbs and a smaller head. It is native to Africa and also credited with being the fastest terrestrial animal." },
        { word: "plutocrats", definition: "Someone who rules by virtue of his or her wealth." },
        { word: "liberate", definition: "To set free, to make or allow to be free, particularly" },
        { word: "mycetoma", definition: "Chronic subcutaneous inflammation caused by infection with certain bacteria or fungi." },
        { word: "robustly", definition: "In a robust manner." },
        { word: "gradus", definition: "A handbook used as an aid in a difficult art or practice, specifically, a dictionary of Greek or Latin prosody used as a guide in writing of poetry in Greek or Latin." },
        { word: "navvy", definition: "A laborer on a civil engineering project such as a canal or railroad." },
        { word: "cesium", definition: "The chemical element (symbol Cs) with an atomic number of 55. It is a soft, gold-colored, highly reactive alkali metal." },
        { word: "scratchier", definition: "Characterized by scratches." },
        { word: "excerpts", definition: "A clip, snippet, passage or extract from a larger work such as a news article, a film, or a literary composition." },
        { word: "grads", definition: "A type of Soviet artillery multiple rocket launcher, or a rocket fired by this." },
        { word: "goofing", definition: "To make a mistake." },
        { word: "strategizes", definition: "To formulate a strategy." },
        { word: "romaji", definition: "A representation of Japanese in Latin script." },
        { word: "disjoint", definition: "To render disjoint; to remove a connection, linkage, or intersection." },
        { word: "favas", definition: "A fava bean; a bean (seed or seed pod) of the plant Vicia faba or the plant itself." },
        { word: "contraception", definition: "The use of a device or procedure to prevent conception as a result of sexual activity." },
        { word: "rhizoid", definition: "A rootlike structure in fungi and some plants that acts as support and/or aids the absorption of nutrients." },
        { word: "stokeholds", definition: "A chamber where a ship's furnaces are stoked." },
        { word: "financiers", definition: "A person who, as a profession, profits from large financial transactions." },
        { word: "chapels", definition: "A place of worship, smaller than or subordinate to a church." },
        { word: "squattest", definition: "Relatively short or low, and thick or broad." },
        { word: "grosz", definition: "A subdivision of currency, equal to one hundredth of a Polish zloty." },
        { word: "feverishly", definition: "With excitement and determination." },
        { word: "uvea", definition: "The middle of the three concentric layers that make up the eye; it is pigmented and vascular, and comprises the choroid, the ciliary body, and the iris." },
        { word: "backslid", definition: "To regress; to slip backwards or revert to a previous, worse state." },
        { word: "translucent", definition: "Allowing light to pass through, but diffusing it." },
        { word: "epidemiologists", definition: "A scientist (often a medical doctor) who specializes in epidemiology." },
        { word: "consulting", definition: "To seek the opinion or advice of another; to take counsel; to deliberate together; to confer." },
        { word: "ambushes", definition: "The act of concealing oneself and lying in wait to attack by surprise." },
        { word: "sermon", definition: "Religious discourse; a written or spoken address on a religious or moral matter." },
        { word: "underwhelmed", definition: "To fail to impress; to perform disappointingly." },
        { word: "pimpernel", definition: "A plant of the genus Pimpinella, especially burnet saxifrage, Pimpinella saxifraga." },
        { word: "coleorhizae", definition: "A sheath-like structure found in a monocotyledon plant seed that acts as a protective covering enclosing the radicle." },
        { word: "howlets", definition: "An owl; an owlet." },
        { word: "silicic", definition: "Of, related to, or derived from silica" },
        { word: "arouse", definition: "To stimulate feelings." },
        { word: "burke", definition: "(sometimes affectionate) A fool, prat, twit." },
        { word: "silencers", definition: "Something that silences." },
        { word: "adulthoods", definition: "The state or condition of a human being once it has reached physical maturity, and is presumed to have reached a state of psychological maturity, to wit: once it has become an adult." },
        { word: "enrolled", definition: "To enter (a name, etc.) in a register, roll or list" },
        { word: "louseworts", definition: "Any of very many semiparasitic flowering plants, of the genus Pedicularis, related to wood betony." },
        { word: "menaced", definition: "To make threats against (someone); to intimidate." },
        { word: "promoted", definition: "To raise (someone) to a more important, responsible, or remunerative job or rank." },
        { word: "heartbreaking", definition: "The breaking of a heart; great grief, anguish or distress." },
        { word: "ototoxic", definition: "Causing ototoxicity." },
        { word: "inferential", definition: "Of, pertaining to, or derived using inference." },
        { word: "soldieries", definition: "Soldiers considered as a group." },
        { word: "tombolos", definition: "A spit of sand linking an island to the mainland (or to another island), formed by longshore drift." },
        { word: "cognized", definition: "To know, perceive, or become aware of." },
        { word: "reek", definition: "A strong unpleasant smell." },
        { word: "marchionesses", definition: "The wife of a marquess." },
        { word: "tunicles", definition: "A small tunic." },
        { word: "scanner", definition: "A device which scans documents in order to convert them to a digital medium." },
        { word: "misallocate", definition: "To allocate incorrectly or inappropriately." },
        { word: "blowtorch", definition: "A tool which projects a controlled stream of a highly flammable gas over a spark in order to produce a controlled flame." },
        { word: "alpinist", definition: "A skier who specializes in alpine skiing (the disciplines of super-G, giant slalom, slalom, downhill)" },
        { word: "sheepskins", definition: "The skin of a sheep, especially when used to make parchment or in bookbinding." },
        { word: "bonesets", definition: "Any of several plants of the genera Eupatorium and Ageratina." },
        { word: "flawing", definition: "To add a flaw to, to make imperfect or defective." },
        { word: "silt", definition: "Mud or fine earth deposited from running or standing water." },
        { word: "pseudos", definition: "An intellectually pretentious person; a pseudointellectual." },
        { word: "itemize", definition: "To state in items, or by particulars" },
        { word: "normative", definition: "Of or pertaining to a norm or standard." },
        { word: "pectens", definition: "The bones in the hand between the wrist and the fingers." },
        { word: "promoted", definition: "To raise (someone) to a more important, responsible, or remunerative job or rank." },
        { word: "multicar", definition: "Using or involving multiple cars" },
        { word: "nocturn", definition: "The night office of the Christian liturgy of the Hours, such as is performed in monasteries." },
        { word: "cuppy", definition: "Having the form of a cup." },
        { word: "fleury", definition: "(especially of a cross) Decorated (finished at the ends) with fleurs-de-lis." },
        { word: "dyspnoea", definition: "Difficult or labored respiration; shortness of breath." },
        { word: "mazurkas", definition: "A Polish folk dance in triple time, usually moderately fast, containing a heavy accent on the third beat and occasionally the second beat." },
        { word: "platitudinizing", definition: "To utter one or more platitudes; to make obvious, trivial, or clichéd remarks concerning a topic." },
        { word: "chimney", definition: "A vertical tube or hollow column used to emit environmentally polluting gaseous and solid matter (including but not limited to by-products of burning carbon or hydrocarbon based fuels); a flue." },
        { word: "aspects", definition: "Any specific feature, part, or element of something." },
        { word: "part", definition: "A portion; a component." },
        { word: "mediumistic", definition: "Of or pertaining to mediums (people claiming to contact the dead); relating to or having the ability to communicate with spirits." },
        { word: "savory", definition: "A savory snack." },
        { word: "beetling", definition: "To move away quickly, to scurry away." },
        { word: "oxlip", definition: "The plant Primula elatior, similar to cowslip but with larger, pale yellow flowers." },
        { word: "peridots", definition: "A transparent olive-green form of olivine, used as a gem." },
        { word: "delighting", definition: "To give delight to; to affect with great pleasure; to please highly." },
        { word: "admixing", definition: "To mingle with something else; to mix." },
        { word: "knockers", definition: "A device, usually hinged with a striking plate, used for knocking on a door." },
        { word: "neurofibromata", definition: "A benign tumor composed of Schwann cells" },
        { word: "eurhythmic", definition: "Harmonious" },
        { word: "quitting", definition: "To pay (a debt, fine etc.)." },
        { word: "sapodillas", definition: "Manilkara zapota, a long-lived evergreen tree native to the New World tropics." },
        { word: "marchionesses", definition: "The wife of a marquess." },
        { word: "pedicles", definition: "A fleshy line used to attach and anchor brachiopods and some bivalve molluscs to a substrate." },
        { word: "outrushes", definition: "To rush outward; to issue forcibly." },
        { word: "kindest", definition: "Having a benevolent, courteous, friendly, generous, gentle, liberal, sympathetic, or warm-hearted nature or disposition, marked by consideration for – and service to – others." },
        { word: "fusible", definition: "Any substance that can be fused or melted." },
      ],
      "Verdugo": [
        {
  word: "alarmas",
  definition: "Definition of alarms: A summons to arms, as on the approach of an enemy. - (Una convocatoria a las armas, como ante la aproximación de un enemigo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "octuplas",
  definition: "Definition of octuples: An eightfold amount or number - (Una cantidad o número multiplicado por ocho)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "eclecticismos",
  definition: "Definition of eclecticism: The quality of being eclectic - (La cualidad de ser ecléctico)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Rakehell",
  definition: "Definition of Rakehell: A lewd or wanton person; a debauchee; a rake. - (Una persona lasciva o sin sentido; un libertino; un rastrillo.)",
  pronunciation: "/ˈɹeɪkhɛl/"
},
{
  word: "Lobelias",
  definition: "Definition of Lobelias: A member of the genus Lobelia, flowering plants in the Lobelioideae subfamily pf family Campanulaceae, containing many species, some of which are garden plants. - (Un miembro del género Lobelia, plantas con flores de la subfamilia Lobelioideae de la familia Campanulaceae, que contiene muchas especies, algunas de las cuales son plantas de jardín.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "más-astuto",
  definition: "Definition of Canniest: Careful, prudent, cautious. - (Cuidadoso, prudente, cauteloso.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "conyugal",
  definition: "Definition of conjugal: Of or relating to marriage, or the relationship of spouses; connubial. - (De o relacionado con el matrimonio, o la relación de los cónyuges; conyugal.)",
  pronunciation: "/ˈkɒndʒʊɡəl/"
},
{
  word: "teclados",
  definition: "Definition of KEYBOARDS: (etc.) A set of keys used to operate a typewriter, computer etc. - ((etc.) Un conjunto de teclas utilizadas para operar una máquina de escribir, un ordenador, etc.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "estadísticamente",
  definition: "Definition of statistically: In a statistical way. - (De forma estadística.)",
  pronunciation: "/stəˈtɪstɪkl̩i/"
},
{
  word: "bromas",
  definition: "Definition of Japes: A joke or quip. - (Una broma o un chiste.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Gritando",
  definition: "Definition of Screaming: To cry out with a shrill voice; to utter a sudden, sharp outcry, or shrill, loud cry, as in fright or extreme pain; to shriek; to screech. - (Gritar con una voz estridente; pronunciar un grito repentino y agudo, o un grito fuerte y agudo, como en el miedo o el dolor extremo; gritar; chillar.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "poligonal",
  definition: "Definition of Polygon: A plane figure bounded by edges that are all straight lines. - (Una figura plana delimitada por aristas que son todas líneas rectas.)",
  pronunciation: "/ˈpɒliɡɒn/"
},
{
  word: "decritas",
  definition: "Definition of decried: To denounce as harmful. - (Denunciar como perjudicial.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "recreativa",
  definition: "Definition of Recreational: For, or relating to, recreation. - (Para, o en relación con, la recreación.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "peces-de-arena",
  definition: "Definition of sandfish: Genus Gonorynchus spp. (also called beaked sandfish), long, thin ray-finned fishes (family Gonorychidae) - (Género Gonorynchus spp. (también llamado pez arena picudo), peces de aletas radiales largas y delgadas (familia Gonorychidae))",
  pronunciation: "/No pronunciation available/"
},
{
  word: "decomiso",
  definition: "Definition of confiscation: The act or process of confiscating. - (El acto o proceso de decomiso.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "superestrellano",
  definition: "Definition of superstar: Someone who has accumulated a vast amount of fame; a high-level celebrity. - (Alguien que ha acumulado una gran cantidad de fama; una celebridad de alto nivel.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "pentaclo",
  definition: "Definition of pentacle: A flat talisman, almost always disk-shaped, made of parchment, sheet metal, or other substance, marked with a magic symbol or symbols, used in magical evocation. - (Un talismán plano, casi siempre en forma de disco, hecho de pergamino, chapa u otra sustancia, marcado con un símbolo o símbolos mágicos, utilizado en la evocación mágica.)",
  pronunciation: "/ˈpɛnt.ə.kl̩/"
},
{
  word: "significativamente",
  definition: "Definition of significantly: In a significant manner or to a significant extent. - (De manera significativa o en una medida significativa.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "bulto",
  definition: "Definition of package: Something which is packed, a parcel, a box, an envelope. - (Algo que está empacado, un paquete, una caja, un sobre.)",
  pronunciation: "/ˈpækɪdʒ/"
},
{
  word: "de-barro",
  definition: "Definition of Earthenware: An opaque, semi-porous ceramic made from clay and other compounds. - (Cerámica opaca, semi-porosa, de arcilla y otros compuestos.)",
  pronunciation: "/ˈəːθ(ə)nwɛː/"
},
{
  word: "hierbas",
  definition: "Definition of herbs: Any green, leafy plant, or parts thereof, used to flavour or season food. - (Cualquier planta verde, frondosa o partes de la misma, utilizada para aromatizar o sazonar los alimentos.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "honores",
  definition: "Definition of Honors: Recognition of importance or value; respect; veneration (of someone, usually for being morally upright or successful) - (Reconocimiento de importancia o valor; respeto; veneración (de alguien, generalmente por ser moralmente recto o exitoso))",
  pronunciation: "/ˈɒn.əz/"
},
{
  word: "cereales",
  definition: "Definition of cereals: A type of grass (such as wheat, rice or oats) cultivated for its edible grains. - (Un tipo de hierba (como trigo, arroz o avena) cultivada por sus granos comestibles.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "combustión",
  definition: "Definition of combustion: The act or process of burning. - (El acto o proceso de quemar.)",
  pronunciation: "/kəmˈbʌs.tʃən/"
},
{
  word: "óvulos",
  definition: "Definition of Egg: An approximately spherical or ellipsoidal body produced by birds, reptiles, insects and other animals, housing the embryo during its development. - (Cuerpo aproximadamente esférico o elipsoidal producido por aves, reptiles, insectos y otros animales, que aloja al embrión durante su desarrollo.)",
  pronunciation: "/eɪɡ/"
},
{
  word: "gestión",
  definition: "Definition of Software: Encoded computer instructions, usually modifiable (unless stored in some form of unalterable memory such as ROM). - (Instrucciones informáticas codificadas, generalmente modificables (a menos que se almacenen en alguna forma de memoria inalterable, como la Rom).)",
  pronunciation: "/ˈsɑftˌwɛɹ/"
},
{
  word: "Precipitarse",
  definition: "Definition of Precipitate: To make something happen suddenly and quickly. - (Hacer que algo suceda de repente y rápidamente.)",
  pronunciation: "/pɹəˈsɪpɪteɪt/"
},
{
  word: "Patria",
  definition: "Definition of Homeland: The country that one regards as home. - (El país que uno considera como su hogar.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "calidez",
  definition: "Definition of warmth: A moderate degree of heat; the sensation of being warm. - (Un grado moderado de calor; la sensación de estar caliente.)",
  pronunciation: "/wɔːmθ/"
},
{
  word: "caminar-penosamente",
  definition: "Definition of Trudge: A tramp, i.e. a long and tiring walk. - (Un vagabundo, es decir, una caminata larga y agotadora.)",
  pronunciation: "/tɹʌdʒ/"
},
{
  word: "folletos",
  definition: "Definition of brochures: A booklet of printed informational matter, like a pamphlet, often for promotional purposes. - (Un folleto de material informativo impreso, como un folleto, a menudo con fines promocionales.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "aspirantes",
  definition: "Definition of CANDIDATES: A person who is running in an election. - (Una persona que se postula en una elección.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Frypans",
  definition: "Definition of Frypans: A frying pan. - (¿Un sartén?)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "satrapes",
  definition: "Definition of satraps: A governor of a Persian province. - (Un gobernador de una provincia persa.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "atrevido",
  definition: "Definition of bold: A dwelling; habitation; building. - (Una vivienda; habitación; edificio.)",
  pronunciation: "/bəʊld/"
},
{
  word: "homogamias",
  definition: "Definition of homogamy: Fertilization of a flower by pollen from the same plant. - (Fertilización de una flor por polen de la misma planta.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Endurecer",
  definition: "Definition of Harden: To become hard (tough, resistant to pressure). - (Para volverse duro (duro, resistente a la presión).)",
  pronunciation: "/ˈhɑːdn̩/"
},
{
  word: "superando",
  definition: "Definition of Overcoming: To surmount (a physical or abstract obstacle); to prevail over, to get the better of. - (Superar (un obstáculo físico o abstracto); prevalecer sobre, sacar lo mejor de.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "entre",
  definition: "Definition of between: A kind of needle, shorter than a sharp, with a small rounded eye, used for making fine stitches on heavy fabrics. - (Una especie de aguja, más corta que afilada, con un pequeño ojo redondeado, utilizada para hacer puntadas finas en telas gruesas.)",
  pronunciation: "/bɪˈtwiːn/"
},
{
  word: "Elusory",
  definition: "Definition of Elusory: That tends to elude - (Eso tiende a eludir)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "zorros",
  definition: "Definition of FOXES: A red fox, small carnivore (Vulpes vulpes), related to dogs and wolves, with red or silver fur and a bushy tail. - (Un zorro rojo, pequeño carnívoro (Vulpes vulpes), emparentado con perros y lobos, con pelaje rojo o plateado y una cola tupida.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "extorsión",
  definition: "Definition of extortion: The practice of extorting money or other property by the use of force or threats. - (La práctica de extorsionar dinero u otros bienes mediante el uso de la fuerza o amenazas.)",
  pronunciation: "/ɪkˈstɔːʃn/"
},
{
  word: "delicioso",
  definition: "Definition of Yummiest: (lighthearted) Delicious. - ((despreocupado) Delicioso.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "disminución",
  definition: "Definition of decrease: An amount by which a quantity is decreased. - (Una cantidad en la que se disminuye una cantidad.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "militariza",
  definition: "Definition of militarizes: To give a military character to something, such as government or organization. - (Dar un carácter militar a algo, como el gobierno o la organización.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "comprobantes",
  definition: "Definition of vouchers: A piece of paper that entitles the holder to a discount, or that can be exchanged for goods and services. - (Una hoja de papel que da derecho al titular a un descuento, o que se puede cambiar por bienes y servicios.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "bodas",
  definition: "Definition of Weddings: Marriage ceremony; ritual officially celebrating the beginning of a marriage. - (Ceremonia de matrimonio; ritual que celebra oficialmente el comienzo de un matrimonio.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "cuñas",
  definition: "Definition of Wedgie: an uncomfortable tightening of the underpants between the buttocks - (un incómodo ajuste de los calzoncillos entre las nalgas)",
  pronunciation: "/No pronunciation available/"
},

{
  word: "quisquilloso",
  definition: "Definition of Nitpick: To correct minutiae or find fault in unimportant details. - (Para corregir minucias o encontrar fallas en detalles sin importancia.)",
  pronunciation: "/ˈnɪt.pɪk/"
},
{
  word: "Inacción",
  definition: "Definition of Inaction: Lack of action or activity or labor - (Falta de acción o actividad o mano de obra)",
  pronunciation: "/ɪnˈækʃən/"
},
{
  word: "los-sentidos",
  definition: "Definition of Senses: Any of the manners by which living beings perceive the physical world: for humans sight, smell, hearing, touch, taste. - (Cualquiera de las formas en que los seres vivos perciben el mundo físico: para los humanos, la vista, el olfato, el oído, el tacto, el gusto.)",
  pronunciation: "/ˈsɛnsɪz/"
},
{
  word: "cimetidina",
  definition: "Definition of cimetidine: A histamine H2-receptor antagonist that inhibits the production of acid in the stomach, mainly used to treat heartburn and peptic ulcers, but notorious for causing male impotence. - (Un antagonista del receptor H2 de la histamina que inhibe la producción de ácido en el estómago, utilizado principalmente para tratar la acidez estomacal y las úlceras pépticas, pero notorio por causar impotencia masculina.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "modificaciones",
  definition: "Definition of modifications: The form of existence belonging to a particular object, entity etc.; a mode of being. - (La forma de existencia que pertenece a un objeto, entidad, etc. en particular; un modo de ser.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "incestuosa",
  definition: "Definition of Incest: Sexual relations between close relatives, especially immediate family members and first cousins, usually considered taboo; in many jurisdictions, close relatives are not allowed to marry, and incest is a crime. - (Las relaciones sexuales entre parientes cercanos, especialmente familiares inmediatos y primos hermanos, generalmente se consideran tabú; en muchas jurisdicciones, a los parientes cercanos no se les permite casarse, y el incesto es un delito.)",
  pronunciation: "/ˈɪnsɛst/"
},
{
  word: "explosiones",
  definition: "Definition of Explosions : A violent release of energy (sometimes mechanical, nuclear, or chemical.) - (Una liberación violenta de energía (a veces mecánica, nuclear o química).)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "líquido",
  definition: "Definition of liquid: A substance that is flowing, and keeping no shape, such as water; a substance of which the molecules, while not tending to separate from one another like those of a gas, readily change their relative position, and which therefore retains no definite shape, except that determined by the containing receptacle; an inelastic fluid. - (Una sustancia que fluye y no mantiene forma, como el agua; una sustancia cuyas moléculas, aunque no tienden a separarse entre sí como las de un gas, cambian fácilmente su posición relativa y que, por lo tanto, no conserva una forma definida, excepto la determinada por el receptáculo que la contiene; un fluido inelástico.)",
  pronunciation: "/ˈlɪkwɪd/"
},
{
  word: "estrella",
  definition: "Definition of star: Any small luminous dot appearing in the cloudless portion of the night sky, especially with a fixed location relative to other such dots. - (Cualquier pequeño punto luminoso que aparezca en la parte sin nubes del cielo nocturno, especialmente con una ubicación fija en relación con otros puntos similares.)",
  pronunciation: "/stɑː(ɹ)/"
},
{
  word: "Jerry-puede",
  definition: "Definition of Jerrycans: A robust fuel container made from pressed steel. - (Un contenedor de combustible robusto hecho de acero prensado.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "gorila",
  definition: "Definition of Gorilla: The largest of the apes, native to the forests of central Africa, and known for their trait of knuckle-walking. - (El más grande de los simios, nativo de los bosques de África central, y conocido por su característica de caminar con los nudillos.)",
  pronunciation: "/ɡəˈɹɪl.ə/"
},
{
  word: "fuera-de-casa",
  definition: "Definition of away: To depart; to go to another place. - (Para partir; para ir a otro lugar.)",
  pronunciation: "/əˈweɪ/"
},
{
  word: "bronce",
  definition: "Definition of bronze: A naturally occurring or man-made alloy of copper, usually in combination with tin, but also with one or more other metals. - (Una aleación de cobre de origen natural o artificial, generalmente en combinación con estaño, pero también con uno o más metales.)",
  pronunciation: "/bɹɒnz/"
},
{
  word: "naufragio",
  definition: "Definition of shipwreck: A ship that has sunk or run aground so that it is no longer seaworthy. - (Un barco que se ha hundido o encallado para que ya no esté en condiciones de navegar.)",
  pronunciation: "/ˈʃɪpɹɛk/"
},
{
  word: "indefenso",
  definition: "Definition of defenseless: Lacking any form of defense; vulnerable; open to attack. - (Falta de cualquier forma de defensa; vulnerable; abierto al ataque.)",
  pronunciation: "/dɪˈfɛnsləs/"
},
{
  word: "colgando",
  definition: "Definition of Hangup: An emotional difficulty or a psychological inhibition; a complex. - (Una dificultad emocional o una inhibición psicológica; un complejo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "alimentador",
  definition: "Definition of feeder: One who feeds, or gives food to another. - (Uno que alimenta o da de comer a otro.)",
  pronunciation: "/ˈfidɚ/"
},
{
  word: "esculpida",
  definition: "Definition of sculpted: To form by sculpture. - (Formar por escultura.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Cambio",
  definition: "Definition of Change: The process of becoming different. - (El proceso de volverse diferente.)",
  pronunciation: "/tʃeɪndʒ/"
},
{
  word: "Bikeway",
  definition: "Definition of Bikeway: A bicycle lane or path. - (Un carril o sendero para bicicletas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "carrera",
  definition: "Definition of career: One's calling in life; a person's occupation; one's profession. - (La vocación de uno en la vida; la ocupación de una persona; la profesión de uno.)",
  pronunciation: "/kəˈɹɪə/"
},
{
  word: "embarcación",
  definition: "Definition of Watercraft: Any vessel with implements designed to move it in arbitrary direction through one or various bodies of water – a boat, ship, sea scooter, or similar vehicle. - (Cualquier embarcación con implementos diseñados para moverla en dirección arbitraria a través de uno o varios cuerpos de agua: un bote, barco, scooter de mar o vehículo similar.)",
  pronunciation: "/ˈwɔtɚkɹæft/"
},
{
  word: "promisores",
  definition: "Definition of promises: An oath or affirmation; a vow - (Un juramento o afirmación; un voto)",
  pronunciation: "/ˈpɹɒmɪsɪz/"
},
{
  word: "yate",
  definition: "Definition of yacht: A slick and light ship for making pleasure trips or racing on water, having sails but often motor-powered. At times used as a residence offshore on a dock. - (Un barco liso y ligero para hacer viajes de placer o carreras en el agua, con velas pero a menudo con motor. A veces se utiliza como residencia en alta mar en un muelle.)",
  pronunciation: "/jɒt/"
},
{
  word: "ruptura",
  definition: "Definition of breakdown: A failure, particularly mechanical; something that has failed - (Una falla, particularmente mecánica; algo que ha fallado)",
  pronunciation: "/ˈbɹeɪkdaʊn/"
},
{
  word: "silbando",
  definition: "Definition of Swishing: To make a rustling sound while moving. - (Para hacer un sonido crujiente mientras se mueve.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "invalidaciones",
  definition: "Definition of Overrides: A mechanism, device or procedure used to counteract an automatic control. - (Un mecanismo, dispositivo o procedimiento utilizado para contrarrestar un control automático.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "sintagmática",
  definition: "Definition of syntagmatic: Of or pertaining to a syntagma. - (Perteneciente o perteneciente a un sintagma.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "barrote",
  definition: "Definition of bar: A solid, more or less rigid object of metal or wood with a uniform cross-section smaller than its length. - (Un objeto sólido, más o menos rígido, de metal o madera con una sección transversal uniforme menor que su longitud.)",
  pronunciation: "/bɑː/"
},
{
  word: "sin-pelo",
  definition: "Definition of Hairless: Destitute of hair. - (Pobres de pelo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "jubilaría",
  definition: "Definition of retirement: An act of retiring; withdrawal. - (Un acto de retiro; retiro.)",
  pronunciation: "/ɹəˈtaɪə(ɹ).mənt/"
},
{
  word: "capuchas",
  definition: "Definition of hoods: A covering for the head attached to a larger garment such as a jacket or cloak. - (Una cubierta para la cabeza unida a una prenda más grande, como una chaqueta o una capa.)",
  pronunciation: "/hʊdz/"
},
{
  word: "estratos",
  definition: "Definition of stratus: A principal, low-level cloud type in the form of a gray layer with a rather uniform base, usually not associated with precipitation, and capable of producing corona phenomena and a weak, uniform luminance; abbreviated St. - (Un tipo de nube principal de bajo nivel en forma de una capa gris con una base bastante uniforme, generalmente no asociada con la precipitación, y capaz de producir fenómenos de corona y una luminancia débil y uniforme; abreviado ST.)",
  pronunciation: "/ˈstɹeɪtəs/"
},
{
  word: "estudios",
  definition: "Definition of studios: An artist’s or photographer’s workshop or the room in which an artist works. - (El taller de un artista o fotógrafo o la sala en la que trabaja un artista.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "concertada",
  definition: "Definition of Concerted: To plan together; to settle or adjust by conference, agreement, or consultation. - (Para planificar juntos; para resolver o ajustar por conferencia, acuerdo o consulta.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "calidez",
  definition: "Definition of warmth: A moderate degree of heat; the sensation of being warm. - (Un grado moderado de calor; la sensación de estar caliente.)",
  pronunciation: "/wɔːmθ/"
},
{
  word: "merecidamente",
  definition: "Definition of deservedly: (degree, manner) In a way or to a degree that is deserved or merited. - ((grado, manera) De una manera o en un grado que sea merecido o merecido.)",
  pronunciation: "/dɪˈzɜːvɪdli/"
},
{
  word: "subgenusos",
  definition: "Definition of subgenus: A subdivision of a genus. - (Subdivisión de un género.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "sinapsid",
  definition: "Definition of synapsid: Any animal (including all mammals) of the class Synapsida. - (Cualquier animal (incluidos todos los mamíferos) de la clase Synapsida.)",
  pronunciation: "/sɪˈnapsɪd/"
},
{
  word: "telecomunicaciones",
  definition: "Definition of telecommunication: The science and technology of the communication of messages over a distance using electric, electronic or electromagnetic impulses. - (La ciencia y tecnología de la comunicación de mensajes a distancia mediante impulsos eléctricos, electrónicos o electromagnéticos.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "más",
  definition: "Definition of more: To a greater degree or extent. - (En mayor grado o extensión.)",
  pronunciation: "/ˈmɔː/"
},
{
  word: "descendientes",
  definition: "Definition of descendants: One who is the progeny of a specified person, at any distance of time or through any number of generations. - (Aquel que es la progenie de una persona específica, a cualquier distancia de tiempo o a través de cualquier número de generaciones.)",
  pronunciation: "/dɪˈsɛndənts/"
},
{
  word: "globos",
  definition: "Definition of Balloons: An inflatable buoyant object, often (but not necessarily) round and flexible. - (Un objeto flotante inflable, a menudo (pero no necesariamente) redondo y flexible.)",
  pronunciation: "/bəˈluːnz/"
},
{
  word: "culto",
  definition: "Definition of cult: A group or sect of people with a deviant religious, philosophical or cultural identity, often existing on the margins of society or exploitative towards its members. - (Un grupo o secta de personas con una identidad religiosa, filosófica o cultural desviada, a menudo existente en los márgenes de la sociedad o explotadora hacia sus miembros.)",
  pronunciation: "/kʌlt/"
},
{
  word: "reasignaciones",
  definition: "Definition of Redeployments: The act of redeploying. - (El acto de redistribuir.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "flamantes",
  definition: "Definition of brand new: Utterly new, as new as possible. - (Totalmente nuevo, lo más nuevo posible.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "más-grande",
  definition: "Definition of bigger: Of great size, large. - (De gran tamaño, grande.)",
  pronunciation: "/ˈbɪɡə/"
},
{
  word: "ala",
  definition: "Definition of flange: An external or internal rib or rim, used either to add strength or to hold something in place. - (Una nervadura o borde externo o interno, utilizado ya sea para añadir fuerza o para mantener algo en su lugar.)",
  pronunciation: "/flændʒ/"
},
{
  word: "asqueroso",
  definition: "Definition of Foulest: Covered with, or containing unclean matter; dirty. - (Cubierto con, o que contiene materia sucia; sucio.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "fusil",
  definition: "Definition of Rifle: A shouldered firearm with a long, rifled barrel to improve range and accuracy. - (Un arma de fuego con hombros y un cañón largo y estriado para mejorar el alcance y la precisión.)",
  pronunciation: "/ˈɹaɪfəl/"
},
{
  word: "susurrando",
  definition: "Definition of whispering: To speak softly, or under the breath, so as to be heard only by one near at hand; to utter words without sonant breath; to talk without that vibration in the larynx which gives sonorous, or vocal, sound. - (Hablar suavemente, o bajo la respiración, para ser escuchado solo por uno cercano; pronunciar palabras sin respiración sonora; hablar sin esa vibración en la laringe que da sonido sonoro o vocal.)",
  pronunciation: "/ˈ(h)wɪspəɹɪŋ/"
},
{
  word: "cistrones",
  definition: "Definition of cistrons: The unit of hereditary material (e.g. DNA) that encodes one protein; sometimes used interchangeably with the word gene. - (La unidad de material hereditario (por ejemplo, ADN) que codifica una proteína; a veces se usa indistintamente con la palabra gen.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "lujurias",
  definition: "Definition of lusts: (usually in the phrase 'lust after') To look at or watch with a strong desire, especially of a sexual nature. - ((generalmente en la frase 'lujuria') Mirar o mirar con un fuerte deseo, especialmente de naturaleza sexual.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "cero",
  definition: "Definition of zero: The numeric symbol that represents the cardinal number zero. - (El símbolo numérico que representa el número cardinal cero.)",
  pronunciation: "/ˈzɪəɹəʊ/"
},
{
  word: "intercambiando",
  definition: "Definition of Swapping: To exchange or give (something) in an exchange (for something else). - (Intercambiar o dar (algo) en un intercambio (por otra cosa).)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Gunwale",
  definition: "Definition of Gunwale: The top edge of the hull of a nautical vessel, where it meets the deck. - (El borde superior del casco de una embarcación náutica, donde se encuentra con la cubierta.)",
  pronunciation: "/ˈɡʌnəl/"
},
{
  word: "desarraigados",
  definition: "Definition of Uprooted: To root up; to tear up by the roots, or as if by the roots; to extirpate. - (Desarraigar; desgarrar por las raíces, o como por las raíces; extirpar.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "mensajeros",
  definition: "Definition of Messengers: One who brings messages. - (Aquel que trae mensajes.)",
  pronunciation: "/ˈmɛs.n̩.d͡ʒəz/"
},
{
  word: "último",
  definition: "Definition of last: Final, ultimate, coming after all others of its kind. - (Final, definitivo, después de todos los demás de su tipo.)",
  pronunciation: "/last/"
},
{
  word: "árido",
  definition: "Definition of arid: Very dry. - (Muy seco.)",
  pronunciation: "/ˈæ.ɹɪd/"
},
{
  word: "equivalentes",
  definition: "Definition of equivalents: Anything that is virtually equal to something else, or has the same value, force, etc. - (Cualquier cosa que sea prácticamente igual a otra cosa, o que tenga el mismo valor, fuerza, etc.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "secciones",
  definition: "Definition of office: A ceremonial duty or service, particularly: - (Un deber o servicio ceremonial, en particular:)",
  pronunciation: "/ˈɑfɪs/"
},
{
  word: "más",
  definition: "Definition of more: To a greater degree or extent. - (En mayor grado o extensión.)",
  pronunciation: "/ˈmɔː/"
},
{
  word: "circunvolución",
  definition: "Definition of Gyrus: A ridge or fold on the cerebral cortex. - (Una cresta o pliegue en la corteza cerebral.)",
  pronunciation: "/ˈdʒaɪɹəs/"
},
{
  word: "matrimonio",
  definition: "Definition of marriage: The state of being married. - (El estado de estar casado.)",
  pronunciation: "/ˈmæɹɪdʒ/"
},
{
  word: "gemelos",
  definition: "Definition of binocular: A pair of binoculars. - (par de prismáticos)",
  pronunciation: "/bɪˈnɒkjʊlə(ɹ)/"
},
{
  word: "Swineherd",
  definition: "Definition of Swineherd: A person who herds and tends swine, a keeper of swine (pigs). - (Una persona que pastorea y cuida cerdos, un guardián de cerdos (cerdos).)",
  pronunciation: "/ˈswɑɪnˌhɜːd/"
},
{
  word: "rurales",
  definition: "Definition of Rural: A person from the countryside; a rustic. - (Una persona del campo; un rústico.)",
  pronunciation: "/ˈɹɔːɹəl/"
},
{
  word: "despidos",
  definition: "Definition of Dismissals: The act of sending someone away. - (El acto de enviar a alguien lejos.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "puede",
  definition: "Definition of can: (auxiliary verb, defective) To know how to; to be able to. - ((verbo auxiliar, defectuoso) Saber; poder.)",
  pronunciation: "/ˈkæn/"
},
{
  word: "presentadores",
  definition: "Definition of Hosts: One which receives or entertains a guest, socially, commercially, or officially. - (Una que recibe o entretiene a un huésped, social, comercial u oficialmente.)",
  pronunciation: "/həʊsts/"
},
{
  word: "tetas",
  definition: "Definition of boobs: Idiot, fool. - (Idiota, idiota.)",
  pronunciation: "/buːbz/"
},
{
  word: "Boho",
  definition: "Definition of Boho: A bohemian. - (A: Bohémica)",
  pronunciation: "/ˈbəʊhəʊ/"
},
{
  word: "montajes",
  definition: "Definition of assemblies: A set of pieces that work together in unison as a mechanism or device. - (Un conjunto de piezas que trabajan juntas al unísono como un mecanismo o dispositivo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "abundancia",
  definition: "Definition of abundance: A large quantity; many. - (Una gran cantidad; muchos.)",
  pronunciation: "/əˈbʌn.dn̩s/"
},
{
  word: "reconquistas",
  definition: "Definition of reconquests: The act or process of conquering something again, such as a territory. - (El acto o proceso de conquistar algo de nuevo, como un territorio.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Harkening",
  definition: "Definition of Harkening: To hark back, to return or revert (to a subject, etc.), to allude to, to evoke, to long or pine for (a past event or era). - (Rememorar, regresar o revertir (a un tema, etc.), aludir, evocar, anhelar o añorar (un evento o época pasada).)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Higos",
  definition: "Definition of Figs: A fruit-bearing tree or shrub of the genus Ficus that is native mainly to the tropics. - (Un árbol o arbusto frutal del género Ficus que es nativo principalmente de los trópicos.)",
  pronunciation: "/fɪɡz/"
},
{
  word: "desviaciones",
  definition: "Definition of Deviations: The act of deviating; wandering off the correct or true path or road - (El acto de desviarse; desviarse del camino o camino correcto o verdadero)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "despidos",
  definition: "Definition of Dismissals: The act of sending someone away. - (El acto de enviar a alguien lejos.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "bajo",
  definition: "Definition of value: The quality (positive or negative) that renders something desirable or valuable. - (La cualidad (positiva o negativa) que hace que algo sea deseable o valioso.)",
  pronunciation: "/ˈvæljuː/"
},
{
  word: "perpetradores",
  definition: "Definition of Perpetrators: One who perpetrates; especially, one who commits an offence or crime. - (Aquel que comete; especialmente, aquel que comete un delito o delito.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "transcripción",
  definition: "Definition of transcription: The act or process of transcribing. - (El acto o proceso de transcripción.)",
  pronunciation: "/tɹænˈskɹɪpʃən/"
},
{
  word: "ceguera",
  definition: "Definition of blindness: The condition of being blind; unable to see. - (La condición de ser ciego; incapaz de ver.)",
  pronunciation: "/ˈblaɪndnəs/"
},
{
  word: "montañismos",
  definition: "Definition of mountaineering: The sport of climbing mountains. - (El deporte de escalar montañas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "dinero",
  definition: "Definition of money: A legally or socially binding conceptual contract of entitlement to wealth, void of intrinsic value, payable for all debts and taxes, and regulated in supply. - (Un contrato conceptual legal o socialmente vinculante de derecho a la riqueza, sin valor intrínseco, pagadero por todas las deudas e impuestos, y regulado en la oferta.)",
  pronunciation: "/ˈmʌni/"
},
{
  word: "Scrutineer",
  definition: "Definition of Scrutineer: A person who scrutinises; a person responsible for scrutineering. - (Una persona que escruta; una persona responsable del escrutinio.)",
  pronunciation: "/ˈskɹuː.tɪn.ɪə(ɹ)/"
},
{
  word: "lubricantes",
  definition: "Definition of lubricants: A substance used to reduce friction between objects or surfaces. - (Sustancia utilizada para reducir la fricción entre objetos o superficies.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "incentros",
  definition: "Definition of centers: The point in the interior of a circle that is equidistant from all points on the circumference. - (El punto en el interior de un círculo que es equidistante de todos los puntos de la circunferencia.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "colmillos",
  definition: "Definition of Fangs: A long, pointed canine tooth used for biting and tearing flesh - (Un diente canino largo y puntiagudo utilizado para morder y desgarrar la carne)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "aritmias",
  definition: "Definition of arrhythmias: An irregular heartbeat. - (Latido cardíaco acelerado)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "actualización",
  definition: "Definition of updated: To bring (a thing) up to date. - (Para poner (una cosa) al día.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "tacos",
  definition: "Definition of wadding: Wads collectively - (Wads colectivamente)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "mami",
  definition: "Definition of mother: A (human) female who has given birth to a baby - (Una mujer (humana) que ha dado a luz a un bebé)",
  pronunciation: "/ˈmʌðə(ɹ)/"
},
{
  word: "jeringa",
  definition: "Definition of Syringe: A device used for injecting or drawing fluids through a membrane. - (Un dispositivo utilizado para inyectar o extraer fluidos a través de una membrana.)",
  pronunciation: "/səˈɹɪndʒ/"
},
{
  word: "precesos",
  definition: "Definition of precesses: (of an axis of rotation) To have an angle that varies cyclically. - ((de un eje de rotación) Tener un ángulo que varía cíclicamente.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "flaco",
  definition: "Definition of narrow: (chiefly in the plural) A narrow passage, especially a contracted part of a stream, lake, or sea; a strait connecting two bodies of water. - ((principalmente en plural) Un pasaje estrecho, especialmente una parte contraída de un arroyo, lago o mar; un estrecho que conecta dos cuerpos de agua.)",
  pronunciation: "/ˈnæɹəʊ/"
},
{
  word: "colgante",
  definition: "Definition of pendant: A supporting post attached to the main rafter. - (Un poste de soporte unido a la viga principal.)",
  pronunciation: "/ˈpɛnd(ə)nt/"
},
{
  word: "Persecución",
  definition: "Definition of Prosecution: The act of prosecuting a scheme or endeavor. - (El acto de perseguir un plan o esfuerzo.)",
  pronunciation: "/ˌpɹɑ.səˈkju.ʃən/"
},
{
  word: "Hoist",
  definition: "Definition of Hello: 'Hello!' or an equivalent greeting. - ('¡Hola!' o un saludo equivalente.)",
  pronunciation: "/həˈləʊ/"
},
{
  word: "ejecutado",
  definition: "Definition of executed: To kill as punishment for capital crimes. - (Matar como castigo por delitos capitales.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "perigeos",
  definition: "Definition of perigee: The point, in an orbit about the Earth, that is closest to the Earth: the periapsis of an Earth orbiter. - (El punto, en una órbita alrededor de la Tierra, que está más cerca de la Tierra: la periapsis de un orbitador terrestre.)",
  pronunciation: "/ˈpɛɹɪdʒiː/"
},
{
  word: "Oído",
  definition: "Definition of Hearing: (stative) To perceive sounds through the ear. - ((estático) Percibir sonidos a través del oído.)",
  pronunciation: "/ˈhiːɹ.ɪŋ/"
},
{
  word: "laguna",
  definition: "Definition of gap: An opening in anything made by breaking or parting. - (Una abertura en cualquier cosa hecha por rotura o separación.)",
  pronunciation: "/ɡæp/"
},
{
  word: "sectarismo",
  definition: "Definition of Sectarianism: Rigid adherence to a particular sect, denomination, ideology, or party. - (Adhesión rígida a una secta, denominación, ideología o partido en particular.)",
  pronunciation: "/sekˈteəɹi.ənɪzəm/"
},
{
  word: "lealtades",
  definition: "Definition of loyalties: The state of being loyal; fidelity. - (El estado de ser leal; fidelidad.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "promesas-de-contribuciones",
  definition: "Definition of Pledges: A solemn promise to do something. - (Una promesa solemne de hacer algo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "dispensados",
  definition: "Definition of dispensed: To issue, distribute, or give out. - (Para emitir, distribuir o repartir.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "basalto",
  definition: "Definition of basalt: A hard mafic igneous rock of varied mineral content; volcanic in origin, which makes up much of the Earth's oceanic crust. - (Una dura roca ígnea máfica de variado contenido mineral; de origen volcánico, que conforma gran parte de la corteza oceánica de la Tierra.)",
  pronunciation: "/ˈbæsɒlt/"
},
{
  word: "reprobable",
  definition: "Definition of reprehensible: A reprehensible person; a villain. - (Una persona reprensible; un villano.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "fustigaciones",
  definition: "Definition of whippings: The punishment of being whipped. - (El castigo de ser azotado.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "vistos",
  definition: "Definition of citations: An official summons or notice given to a person to appear. - (Una citación o aviso oficial dado a una persona para que comparezca.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "vida-nocturna",
  definition: "Definition of NIGHTLIFE: Nocturnal activities, especially visiting nightclubs. - (Actividades nocturnas, especialmente visitas a discotecas.)",
  pronunciation: "/ˈnaɪtˌlaɪf/"
},
{
  word: "detribalizar",
  definition: "Definition of detribalize: To cause (the members of a tribe) to lose their tribal culture. - (Hacer que (los miembros de una tribu) pierdan su cultura tribal.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "supercalentado",
  definition: "Definition of superheated: To heat a liquid above its boiling point - (Para calentar un líquido por encima de su punto de ebullición)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "delimitado",
  definition: "Definition of Time-Bound: Attached to a certain moment or era in time. - (Apegado a un determinado momento o época en el tiempo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "ventilación",
  definition: "Definition of ventilation: The replacement of stale or noxious air with fresh. - (La sustitución del aire viciado o nocivo por aire fresco.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "no-vacía",
  definition: "Definition of Non-empty: Of a set, containing at least one element; not the empty set. - (De un conjunto, que contiene al menos un elemento; no el conjunto vacío.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "suministros",
  definition: "Definition of deliveries: The act of conveying something. - (El acto de transmitir algo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "reposición",
  definition: "Definition of reclamation: The act of reclaiming or the state of being reclaimed. - (El acto de reclamar o el estado de ser reclamado.)",
  pronunciation: "/(ˌ)ɹɛkləˈmeɪʃn̩/"
},
{
  word: "hernia",
  definition: "Definition of clubroot: A common disease of cabbages, radishes, turnips and other plants of the Cruciferae, caused by Plasmodiophora brassicae, in which galls form on latent roots, rendering them clublike. - (Una enfermedad común de las coles, rábanos, nabos y otras plantas de la Cruciferae, causada por Plasmodiophora brassicae, en la que se forman agallas en las raíces latentes, haciéndolas clublike.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "sonante",
  definition: "Definition of Sonorant: A speech sound that is produced without turbulent airflow in the vocal tract; the generic term of vowel, approximant, nasal consonant, etc. - (Un sonido del habla que se produce sin flujo de aire turbulento en el tracto vocal; el término genérico de vocal, aproximante, consonante nasal, etc.)",
  pronunciation: "/səˈnɔːr(ə)nt/"
},
{
  word: "batiendo",
  definition: "Definition of Beating: To hit; strike - (Para golpear; golpear)",
  pronunciation: "/ˈbiːtɪŋ/"
},
{
  word: "Corrección",
  definition: "Definition of Correction: The act of correcting. - (El acto de corregir.)",
  pronunciation: "/kəˈɹɛkʃən/"
},
{
  word: "amoroso",
  definition: "Definition of amorous: Inclined or having a propensity to love, or to sexual enjoyment. - (Inclinado o con propensión al amor o al disfrute sexual.)",
  pronunciation: "/ˈæ.mə.ɹəs/"
},
{
  word: "promedio",
  definition: "Definition of average: The arithmetic mean. - (La media aritmética.)",
  pronunciation: "/ˈævəɹɪd͡ʒ/"
},
{
  word: "hito",
  definition: "Definition of milestone: A stone milepost (or by extension in other materials), one of a series of numbered markers placed along a road at regular intervals, typically at the side of the road or in a median. - (Un poste de piedra (o por extensión en otros materiales), uno de una serie de marcadores numerados colocados a lo largo de una carretera a intervalos regulares, generalmente al lado de la carretera o en una mediana.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "aquí",
  definition: "Definition of here: (abstract) This place; this location. - ((resumen) Este lugar; esta ubicación.)",
  pronunciation: "/hiːɹ/"
},
{
  word: "antídotos",
  definition: "Definition of Antidote: A remedy to counteract the effects of poison (often followed by 'against,' 'for,' or 'to'). - (Un remedio para contrarrestar los efectos del veneno (a menudo seguido de 'en contra', 'a favor' o 'para').)",
  pronunciation: "/ˈæn.tə.dot/"
},
{
  word: "tripulantes",
  definition: "Definition of Crew: To make the shrill sound characteristic of a rooster; to make a sound in this manner, either in gaiety, joy, pleasure, or defiance. - (Hacer el sonido agudo característico de un gallo; hacer un sonido de esta manera, ya sea en alegría, gozo, placer o desafío.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "gobernantes",
  definition: "Definition of Rulers: A (usually rigid), flat, rectangular measuring or drawing device with graduations in units of measurement; a straightedge with markings. - (Un dispositivo de medida o dibujo (generalmente rígido), plano, rectangular con graduaciones en unidades de medida; una regla con marcas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "ineficaz",
  definition: "Definition of Inefficient: A person who cannot or does not work efficiently. - (Una persona que no puede o no trabaja eficientemente.)",
  pronunciation: "/ɪnɪˈfɪʃənt/"
},
{
  word: "prologuismo",
  definition: "Definition of prologue: A speech or section used as an introduction, especially to a play or novel. - (Un discurso o sección utilizado como introducción, especialmente a una obra de teatro o novela.)",
  pronunciation: "/ˈpɹəʊlɒɡ/"
},
{
  word: "heroico",
  definition: "Definition of heroic: A heroic verse. - (Un verso heroico.)",
  pronunciation: "/hɪˈɹəʊ.ɪk/"
},
{
  word: "constructores",
  definition: "Definition of builders: A person who builds or constructs things. - (Una persona que construye o construye cosas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "flores",
  definition: "Definition of flowers: A colorful, conspicuous structure associated with angiosperms, frequently scented and attracting various insects, and which may or may not be used for sexual reproduction. - (Una estructura colorida y conspicua asociada con angiospermas, frecuentemente perfumada y que atrae a varios insectos, y que puede o no usarse para la reproducción sexual.)",
  pronunciation: "/ˈflaʊ.əz/"
},
{
  word: "exploraciones",
  definition: "Definition of Explorations: The process of exploring. - (El proceso de exploración.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "fuerapunches",
  definition: "Definition of outpunches: To punch harder or better than. - (Para golpear más fuerte o mejor que.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "caprichoso",
  definition: "Definition of whimsical: Given to whimsy. - (Dada a la caprichosidad.)",
  pronunciation: "/ˈwɪmzɪkəl/"
},
{
  word: "muerto",
  definition: "Definition of dead: (with 'the', a demonstrative, or a possessive) Those who have died. - ((con 'el', un demostrativo o un posesivo) Aquellos que han muerto.)",
  pronunciation: "/diːd/"
},
{
  word: "servilidades",
  definition: "Definition of servility: The condition of being servile. - (La condición de ser servil.)",
  pronunciation: "/sə.ˈvɪ.lɪ.ti/"
},
{
  word: "él",
  definition: "Definition of he: The game of tag, or it, in which the player attempting to catch the others is called 'he'. - (El juego de etiqueta, o it, en el que el jugador que intenta atrapar a los demás se llama 'él'.)",
  pronunciation: "/hi/"
},
{
  word: "utilización",
  definition: "Definition of use: The act of using. - (El acto de usar.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "paladar",
  definition: "Definition of palate: The roof of the mouth; the uraniscus. - (El techo de la boca; el uranisco.)",
  pronunciation: "/ˈpælət/"
},
{
  word: "miembros",
  definition: "Definition of members: One who officially belongs to a group. - (Aquel que oficialmente pertenece a un grupo.)",
  pronunciation: "/ˈmɛmbəz/"
},
{
  word: "ladrones",
  definition: "Definition of thieves: One who carries out a theft. - (Aquel que lleva a cabo un robo.)",
  pronunciation: "/θiːvz/"
},
{
  word: "amabilidad",
  definition: "Definition of gentleness: The state of being gentle. - (El estado de ser gentil.)",
  pronunciation: "/ˈd͡ʒɛntl̩nəs/"
},
{
  word: "sin-trabas",
  definition: "Definition of unfettered: To release from fetters; to unchain; to let loose; to free. - (Liberarse de las cadenas; desencadenar; soltar; liberar.)",
  pronunciation: "/ʌnˈfɛtəd/"
},
{
  word: "secuenciado",
  definition: "Definition of sequenced: To arrange in an order - (Para organizar un pedido)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "sinergia",
  definition: "Definition of synergy: (systems theory) A synonym of binding energy. - ((teoría de sistemas) Sinónimo de energía de enlace.)",
  pronunciation: "/ˈsɪnədʒi/"
},
{
  word: "aceite",
  definition: "Definition of oil: Liquid fat. - (Grasa líquida.)",
  pronunciation: "/ɔɪl/"
},
{
  word: "Levantamiento",
  definition: "Definition of Documentation: Something transposed from a thought to a document; the written account of an idea. - (Algo transpuesto de un pensamiento a un documento; el relato escrito de una idea.)",
  pronunciation: "/ˌdɒkjʊmənˈteɪʃən/"
},
{
  word: "transecto",
  definition: "Definition of Transect: A path along which a researcher moves to count and record observations or collect data. - (Un camino a lo largo del cual un investigador se mueve para contar y registrar observaciones o recopilar datos.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Ratitas",
  definition: "Definition of Rats: A medium-sized rodent belonging to the genus Rattus. - (Roedor de tamaño mediano perteneciente al género Rattus.)",
  pronunciation: "/ɹæts/"
},
{
  word: "monedas",
  definition: "Definition of coins: (money) A piece of currency, usually metallic and in the shape of a disc, but sometimes polygonal, or with a hole in the middle. - ((dinero) Una moneda, generalmente metálica y en forma de disco, pero a veces poligonal, o con un agujero en el medio.)",
  pronunciation: "/kɔɪnz/"
},
{
  word: "flamencos",
  definition: "Definition of flamingos: A wading bird of the family Phoenicopteridae. - (Ave zancuda de la familia Phoenicopteridae.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "tres",
  definition: "Definition of three: The digit/figure 3. - (El dígito/figura 3.)",
  pronunciation: "/θɹiː/"
},
{
  word: "hermano",
  definition: "Definition of brother: Son of the same parents as another person. - (Hijo de los mismos padres que otra persona.)",
  pronunciation: "/ˈbɹɐðɘ(ɹ)/"
},
{
  word: "subvención",
  definition: "Definition of grant: The act of granting; a bestowing or conferring; concession; allowance; permission. - (El acto de otorgar; un otorgamiento o conferir; concesión; asignación; permiso.)",
  pronunciation: "/ɡɹɑːnt/"
},
{
  word: "jugadores",
  definition: "Definition of players: One that plays - (Uno que juega)",
  pronunciation: "/ˈpleɪəz/"
},
{
  word: "malos",
  definition: "Definition of bad: Error, mistake. - (error)",
  pronunciation: "/bæːd/"
},
{
  word: "incompleta",
  definition: "Definition of incomplete: Something incomplete. - (Algo incompleto.)",
  pronunciation: "/ɪn.kəm.ˈpliːt/"
},
{
  word: "tetas",
  definition: "Definition of boobs: Idiot, fool. - (Idiota, idiota.)",
  pronunciation: "/buːbz/"
},
{
  word: "equitativo",
  definition: "Definition of equitable: Marked by or having equity. - (Marcado por o con equidad.)",
  pronunciation: "/ˈɛk.wɪ.tə.bəl/"
},
{
  word: "capacitación",
  definition: "Definition of training: To practice an ability. - (Para practicar una habilidad.)",
  pronunciation: "/ˈtɹeɪnɪŋ/"
},
{
  word: "convincente",
  definition: "Definition of convincing: To make someone believe, or feel sure about something, especially by using logic, argument or evidence. - (Hacer que alguien crea o se sienta seguro de algo, especialmente mediante el uso de la lógica, el argumento o la evidencia.)",
  pronunciation: "/kənˈvɪnsɪŋ/"
},
{
  word: "precipito",
  definition: "Definition of precipitate: To make something happen suddenly and quickly. - (Hacer que algo suceda de repente y rápidamente.)",
  pronunciation: "/pɹəˈsɪpɪteɪt/"
},
{
  word: "cascadas",
  definition: "Definition of CASCADES: A waterfall or series of small waterfalls. - (Una cascada o una serie de pequeñas cascadas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "renovado",
  definition: "Definition of renewed: To make (something) new again; to restore to freshness or original condition. - (Volver a hacer (algo) nuevo; restaurar la frescura o la condición original.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "grado",
  definition: "Definition of grade: A rating. - (A: riesgo muy bajo)",
  pronunciation: "/ɡɹeɪd/"
},
{
  word: "sumergido",
  definition: "Definition of submerged: To sink out of sight. - (Para hundirse fuera de la vista.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "embajada",
  definition: "Definition of embassy: The function or duty of an ambassador. - (La función o el deber de un embajador.)",
  pronunciation: "/ˈɛmbəsi/"
},
{
  word: "arqueadores",
  definition: "Definition of archers: One who shoots an arrow from a bow or a bolt from a crossbow. - (Aquel que dispara una flecha desde un arco o un perno desde una ballesta.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "exuberante",
  definition: "Definition of exuberant: (of people) Very high-spirited; extremely energetic and enthusiastic. - ((de personas) Muy animado; extremadamente enérgico y entusiasta.)",
  pronunciation: "/ɪɡˈzuːbəɹənt/"
},
{
  word: "exógeno",
  definition: "Definition of exogenous: Having an external cause. - (Tener una causa externa.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "tristeza",
  definition: "Definition of sadness: The state or emotion of being sad. - (El estado o la emoción de estar triste.)",
  pronunciation: "/ˈsædnəs/"
},
{
  word: "cabecera",
  definition: "Definition of Director: One who directs; the person in charge of managing a department or directorate (e.g., director of engineering), project, or production (as in a show or film, e.g., film director). - (Quien dirige; la persona a cargo de administrar un departamento o dirección (por ejemplo, director de ingeniería), proyecto o producción (como en un espectáculo o película, por ejemplo, director de cine).)",
  pronunciation: "/daɪˈɹɛktə(ɹ)/"
},
{
  word: "cosmogonía",
  definition: "Definition of Cosmogony: The study of the origin, and sometimes the development, of the universe or the solar system, in astrophysics, religion, and other fields. - (El estudio del origen, y a veces el desarrollo, del universo o del sistema solar, en astrofísica, religión y otros campos.)",
  pronunciation: "/kɒzˈmɒɡəni/"
},
{
  word: "obstrucción",
  definition: "Definition of blocking: To fill (something) so that it is not possible to pass. - (Para llenar (algo) para que no sea posible pasar.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "jeringa",
  definition: "Definition of Syringe: A device used for injecting or drawing fluids through a membrane. - (Un dispositivo utilizado para inyectar o extraer fluidos a través de una membrana.)",
  pronunciation: "/səˈɹɪndʒ/"
},
{
  word: "emergencias",
  definition: "Definition of emergencies: A situation which poses an immediate risk and which requires urgent attention. - (Situación que supone un riesgo inmediato y que requiere atención urgente.)",
  pronunciation: "/iˈmɜː.dʒən.siːz/"
},
{
  word: "obsoletos",
  definition: "Definition of Deprecated: To belittle or express disapproval of. - (Para menospreciar o expresar desaprobación.)",
  pronunciation: "/ˈdɛp.ɹə.keɪt.ɪd/"
},
{
  word: "intrínsecamente",
  definition: "Definition of inherently: In an inherent way; naturally, innately. - (De forma inherente; naturalmente, de forma innata.)",
  pronunciation: "/ɪnˈhɛɹəntli/"
},
{
  word: "alquilare",
  definition: "Definition of rent: A payment made by a tenant at intervals in order to occupy a property. - (Un pago realizado por un inquilino a intervalos para ocupar una propiedad.)",
  pronunciation: "/ɹɛnt/"
},
{
  word: "delimitaciones",
  definition: "Definition of Delimitations: The act of delimiting something. - (El acto de delimitar algo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Cardioides",
  definition: "Definition of Cardioids: An epicycloid with exactly one cusp; the plane curve with polar equation \rho = 1 + \cos\,\theta - approximately heart-shaped - (Un epicicloide con exactamente una cúspide; la curva plana con ecuación polar\rho = 1 + \cos\,\theta - aproximadamente en forma de corazón)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "horneado",
  definition: "Definition of BAKED: (with person as subject) To cook (something) in an oven. - ((con persona como sujeto) Para cocinar (algo) en un horno.)",
  pronunciation: "/beɪkt/"
},
{
  word: "divulgación",
  definition: "Definition of disclosure: The act of revealing something. - (El acto de revelar algo.)",
  pronunciation: "/dɪsˈkləʊʒə(ɹ)/"
},
{
  word: "casero",
  definition: "Definition of HOMEMADE: Made at home. - (Hecho en casa.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "estuario",
  definition: "Definition of estuary: Coastal water body where ocean tides and river water merge, resulting in a brackish water zone. - (Cuerpo de agua costero donde las mareas oceánicas y el agua del río se fusionan, lo que resulta en una zona de agua salobre.)",
  pronunciation: "/ˈɛstjʊəɹi/"
},
{
  word: "insensato",
  definition: "Definition of senseless: Without feeling or consciousness; deprived of sensation - (Sin sentimiento ni conciencia; privado de sensación)",
  pronunciation: "/ˈsɛnsləs/"
},
{
  word: "motociclistas",
  definition: "Definition of Motorcycling: To ride a motorcycle. - (Conducir una motocicleta.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "motocicletas",
  definition: "Definition of motorcycles: An open-seated motor vehicle with handlebars instead of a steering wheel, and having two (or sometimes three) wheels. - (Un vehículo de motor de asiento abierto con manillar en lugar de un volante, y que tiene dos (o a veces tres) ruedas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "sacerdotes",
  definition: "Definition of priests: A religious clergyman (clergywoman, clergyperson) who is trained to perform services or sacrifices at a church or temple - (Un clérigo religioso (clérigo, clérigo) que está capacitado para realizar servicios o sacrificios en una iglesia o templo)",
  pronunciation: "/ˈpɹiːsts/"
},
{
  word: "horquillas",
  definition: "Definition of forks: A pronged tool having a long straight handle, used for digging, lifting, throwing etc. - (Una herramienta dentada que tiene un mango largo y recto, que se utiliza para cavar, levantar, lanzar, etc.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "literato",
  definition: "Definition of Literature: The body of all written works. - (El cuerpo de todas las obras escritas.)",
  pronunciation: "/ˈlɪ.tə.ɹɪ.tʃə(ɹ)/"
},
{
  word: "masacres",
  definition: "Definition of Massacres: The killing of a considerable number (usually limited to people) where little or no resistance can be made, with indiscriminate violence, without necessity, and contrary to civilized norms. - (El asesinato de un número considerable (generalmente limitado a personas) donde se puede hacer poca o ninguna resistencia, con violencia indiscriminada, sin necesidad y en contra de las normas civilizadas.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "térmica",
  definition: "Definition of Thermal: A column of rising air in the lower atmosphere created by uneven heating of Earth's surface. - (Una columna de aire ascendente en la atmósfera inferior creada por el calentamiento desigual de la superficie de la Tierra.)",
  pronunciation: "/ˈθɝməl/"
},
{
  word: "filas",
  definition: "Definition of rows: A line of objects, often regularly spaced, such as seats in a theatre, vegetable plants in a garden etc. - (Una línea de objetos, a menudo espaciados regularmente, como asientos en un teatro, plantas vegetales en un jardín, etc.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "engañosa",
  definition: "Definition of Misleading: To lead astray, in a false direction. - (Llevar por mal camino, en una dirección falsa.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "empatía",
  definition: "Definition of Empathy: Identification with or understanding of the thoughts, feelings, or emotional state of another person. - (Identificación o comprensión de los pensamientos, sentimientos o estado emocional de otra persona.)",
  pronunciation: "/ˈɛmpəθi/"
},
{
  word: "sueños",
  definition: "Definition of Dreaming: To see imaginary events in one's mind while sleeping. - (Ver eventos imaginarios en la mente mientras se duerme.)",
  pronunciation: "/ˈdɹiː.mɪŋ/"
},
{
  word: "emanante",
  definition: "Definition of emanating: To come from a source; issue from. - (Provenir de una fuente; emitir desde.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "incorrecta",
  definition: "Definition of incorrect: Not correct; erroneous or wrong. - (Incorrecto; erróneo o incorrecto.)",
  pronunciation: "/ˌɪnkəˈɹɛkt/"
},
{
  word: "infarto",
  definition: "Definition of infarct: An area of dead tissue caused by a loss of blood supply; a localized necrosis. - (Un área de tejido muerto causada por una pérdida de suministro de sangre; una necrosis localizada.)",
  pronunciation: "/ɪnˈfɑrkt/"
},
{
  word: "cegueras",
  definition: "Definition of blinders: Something that blinds. - (Algo que ciega.)",
  pronunciation: "/ˈblaɪndəz/"
},
{
  word: "reproducciones",
  definition: "Definition of views: (physical) Visual perception. - (Percepción visual (física).)",
  pronunciation: "/vjuːz/"
},
{
  word: "Fecha-límite",
  definition: "Definition of Deadline: A time limit in the form of a date on or before which something must be completed. - (Un límite de tiempo en forma de una fecha en o antes de la cual se debe completar algo.)",
  pronunciation: "/ˈdɛdˌlaɪn/"
},
{
  word: "rivales",
  definition: "Definition of Opponents: One who opposes another; one who works or takes a position against someone or something; one who attempts to stop the progress of someone or something. - (Uno que se opone a otro; uno que trabaja o toma una posición en contra de alguien o algo; uno que intenta detener el progreso de alguien o algo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "más",
  definition: "Definition of more: To a greater degree or extent. - (En mayor grado o extensión.)",
  pronunciation: "/ˈmɔː/"
},
{
  word: "tripuladas",
  definition: "Definition of manned: To supply (something) with staff or crew (of either sex). - (Suministrar (algo) con personal o tripulación (de cualquier sexo).)",
  pronunciation: "/mænd/"
},
{
  word: "subyacente",
  definition: "Definition of underlying: To lie in a position directly beneath. - (Acostarse en una posición directamente debajo.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "boletines",
  definition: "Definition of newsletter: A periodically sent publication containing current events or the like, generally on a particular topic or geared toward a limited audience. - (Una publicación enviada periódicamente que contiene eventos actuales o similares, generalmente sobre un tema en particular o dirigida a un público limitado.)",
  pronunciation: "/ˈnjuːzˌlɛtə/"
},
{
  word: "confianza",
  definition: "Definition of trust: Confidence in or reliance on some person or quality. - (Confianza o dependencia en alguna persona o cualidad.)",
  pronunciation: "/trʊst/"
},
{
  word: "sede",
  definition: "Definition of website: A collection of interlinked web pages on the World Wide Web that are typically accessible from the same base URL and reside on the same server. - (Una colección de páginas web interconectadas en la World Wide Web a las que normalmente se puede acceder desde la misma URL base y que residen en el mismo servidor.)",
  pronunciation: "/ˈwɛbˌsaɪt/"
},
{
  word: "sermónica",
  definition: "Definition of sermon: Religious discourse; a written or spoken address on a religious or moral matter. - (Discurso religioso; un discurso escrito o hablado sobre un asunto religioso o moral.)",
  pronunciation: "/ˈsɜː.mən/"
},
{
  word: "monoplanos",
  definition: "Definition of monoplanes: An airplane that has a single pair of wings - (Un avión que tiene un solo par de alas)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "indultos",
  definition: "Definition of Pardons: Forgiveness for an offence. - (Perdón por una ofensa.)",
  pronunciation: "/ˈpɑɹ.dənz/"
},
{
  word: "oro",
  definition: "Definition of gold: A heavy yellow elemental metal of great value, with atomic number 79 and symbol Au. - (Un metal elemental amarillo pesado de gran valor, con número atómico 79 y símbolo Au.)",
  pronunciation: "/ɡɒʊld/"
},
{
  word: "arcos",
  definition: "Definition of Arches: An inverted U shape. - (Una forma de U invertida.)",
  pronunciation: "/ˈɑːt͡ʃɪz/"
},
{
  word: "gruesos",
  definition: "Definition of Thick : The thickest, or most active or intense, part of something. - (La parte más gruesa, o más activa o intensa, de algo.)",
  pronunciation: "/θɪk/"
},
{
  word: "musicales",
  definition: "Definition of musicals: A stage performance, show or film that involves singing, dancing and musical numbers performed by the cast as well as acting. - (Una representación teatral, espectáculo o película que implica cantar, bailar y números musicales interpretados por el elenco, así como actuar.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "nieve",
  definition: "Definition of snow: The frozen, crystalline state of water that falls as precipitation. - (El estado congelado y cristalino del agua que cae como precipitación.)",
  pronunciation: "/snəʊ/"
},
{
  word: "de-referencia",
  definition: "Definition of reference: A relationship or relation (to something). - (Una relación o relación (con algo).)",
  pronunciation: "/ˈɹɛf.(ə)ɹəns/"
},
{
  word: "precio",
  definition: "Definition of price: The cost required to gain possession of something. - (El coste requerido para obtener la posesión de algo.)",
  pronunciation: "/pɹaɪs/"
},
{
  word: "no-gubernamental",
  definition: "Definition of non-governmental: Not belonging to, associated with or operated by a particular government. - (No pertenece, está asociado ni es operado por un gobierno en particular.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "arrestado",
  definition: "Definition of Arrest: A check, stop, an act or instance of arresting something. - (Un control, una detención, un acto o una instancia de arresto de algo.)",
  pronunciation: "/əˈɹɛst/"
},
{
  word: "poliamidas",
  definition: "Definition of polyamides: Any of a range of polymers containing amide (or peptide) repeat units; examples include proteins and nylon. - (Cualquiera de una gama de polímeros que contienen unidades de repetición de amida (o péptido); los ejemplos incluyen proteínas y nylon.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "motoriza",
  definition: "Definition of motorized: To fit something with a motor. - (Para montar algo con un motor.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "base",
  definition: "Definition of concentration: The act, process or ability of concentrating; the process of becoming concentrated, or the state of being concentrated. - (El acto, proceso o capacidad de concentración; el proceso de volverse concentrado, o el estado de estar concentrado.)",
  pronunciation: "/ˌkɒnsənˈtɹeɪʃən/"
},
{
  word: "hermética",
  definition: "Definition of Airtight: Impermeable to air or other gases. - (Impermeable al aire u otros gases.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Ganancias",
  definition: "Definition of Profits: Total income or cash flow minus expenditures. The money or other benefit a non-governmental organization or individual receives in exchange for products and services sold at an advertised price. - (Ingresos totales o flujo de efectivo menos gastos. El dinero u otro beneficio que una organización no gubernamental o individuo recibe a cambio de productos y servicios vendidos a un precio anunciado.)",
  pronunciation: "/ˈpɹɒfɪts/"
},
{
  word: "sonido",
  definition: "Definition of sound: Healthy. - (Saludable)",
  pronunciation: "/saʊnd/"
},
{
  word: "guerra",
  definition: "Definition of war: Organized, large-scale, armed conflict between countries or between national, ethnic, or other sizeable groups, usually involving the engagement of military forces. - (Conflicto armado organizado, a gran escala, entre países o entre grupos nacionales, étnicos u otros grupos importantes, que generalmente involucra la participación de fuerzas militares.)",
  pronunciation: "/wɔː/"
},
{
  word: "infligidas",
  definition: "Definition of inflicted: To thrust upon; to impose. - (Empujar; imponer.)",
  pronunciation: "/ɪnˈflɪktɪd/"
},
{
  word: "parodias",
  definition: "Definition of parodies: A work or performance that imitates another work or performance with ridicule or irony. - (Una obra o performance que imita otra obra o performance con ridículo o ironía.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "Fruto",
  definition: "Definition of Fruit: (often in the plural) In general, a product of plant growth useful to man or animals. - ((a menudo en plural) En general, un producto del crecimiento vegetal útil para el hombre o los animales.)",
  pronunciation: "/fɹuːt/"
},
{
  word: "necesidad",
  definition: "Definition of need: A requirement for something; something needed. - (Un requisito para algo; algo necesario.)",
  pronunciation: "/niːd/"
},
{
  word: "amonio",
  definition: "Definition of ammonium: The univalent NH4+ cation, derived by the protonation of ammonia - (El catión NH4+ univalente, derivado de la protonación del amoníaco)",
  pronunciation: "/əˈmoʊni.əm/"
},
{
  word: "colateral",
  definition: "Definition of collateral: A security or guarantee (usually an asset) pledged for the repayment of a loan if one cannot procure enough funds to repay. - (Un valor o garantía (generalmente un activo) pignorado para el reembolso de un préstamo si no se pueden obtener fondos suficientes para reembolsarlo.)",
  pronunciation: "/kəˈlætəɹəl/"
},
{
  word: "fresado",
  definition: "Definition of filing: To commit (official papers) to some office. - (Para comprometerse (documentos oficiales) a alguna oficina.)",
  pronunciation: "/faɪ.lɪŋ/"
},
{
  word: "liderazgos",
  definition: "Definition of leaderships: The capacity of someone to lead others. - (La capacidad de alguien para liderar a otros.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "pastoreo",
  definition: "Definition of grazing: To feed or supply (cattle, sheep, etc.) with grass; to furnish pasture for. - (Para alimentar o abastecer (ganado, ovejas, etc.) con pasto; para proporcionar pastos para.)",
  pronunciation: "/ˈɡɹeɪzɪŋ/"
},
{
  word: "engañosa",
  definition: "Definition of Misleading: To lead astray, in a false direction. - (Llevar por mal camino, en una dirección falsa.)",
  pronunciation: "/No pronunciation available/"
},
{
  word: "recreación",
  definition: "Definition of recreation: Any activity, such as play, that amuses, diverts or stimulates. - (Cualquier actividad, como el juego, que divierta, desvíe o estimule.)",
  pronunciation: "/ɹɛkɹiˈeɪʃən/"
},
{
  word: "legales",
  definition: "Definition of liabilities: An obligation, debt or responsibility owed to someone. - (Una obligación, deuda o responsabilidad contraída con alguien.)",
  pronunciation: "/No pronunciation available/"
},
      ],
    };
//count
let winCount = 0;
let count = 0;

let chosenWord = "";
let chosenDefinition = "";

// Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML = ""; // Clear previous options
  let buttonCon = document.createElement("div");

  for (let value in options) {
    let button = document.createElement("button");
    button.className = "options";
    button.textContent = value;
    button.addEventListener("click", () => {
      generateWord(value);
      optionsContainer.innerHTML = ""; // Clear options after click
    });
    buttonCon.appendChild(button);
  }

  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

let usedWords = []; // Array to store used words

const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  let randomWordObject;
  do {
    randomWordObject = optionArray[Math.floor(Math.random() * optionArray.length)];
  } while (usedWords.includes(randomWordObject.word));

  usedWords.push(randomWordObject.word); // Add the chosen word to the usedWords array

  chosenWord = randomWordObject.word.toUpperCase();
  chosenDefinition = randomWordObject.definition;

  // Create display item with spaces handled correctly
  let displayItem = chosenWord.split('').map(char => char === ' ' ? '<span class="space"> </span>' : '<span class="dashes">_</span>').join('');
  userInputSection.innerHTML = displayItem;

  // Update the alphabet and create letter buttons
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ";
  let characters = alphabet.split('');
  
  // Check if the chosen word contains a hyphen
  if (chosenWord.includes('-')) {
    characters.push('-');
  }

  letterContainer.innerHTML = ""; // Clear previous letters
  for (let char of characters) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = char;
    button.addEventListener("click", letterButtonClickHandler);
    letterContainer.append(button);
  }
};

//Initial Function (Called when page loads/user presses new game)
//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  usedWords = []; // Reset used words for a new game

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ";
  let characters = alphabet.split('');
  
  // Check if the chosen word contains a hyphen
  if (chosenWord.includes('-')) {
    characters.push('-');
  }

  for (let char of characters) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = char;
    button.addEventListener("click", letterButtonClickHandler);
    letterContainer.append(button);
  }

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};
// Letter button click handler
function letterButtonClickHandler() {
  let charArray = chosenWord.split("");
  let dashes = document.getElementsByClassName("dashes");
  if (charArray.includes(this.innerText)) {
    charArray.forEach((char, index) => {
      if (char === this.innerText) {
        dashes[index].innerText = char;
        winCount += 1;
        if (winCount == charArray.length) {
          resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
          showDefinitionPopup(chosenWord, chosenDefinition, true);
          currentStreak++;
          highestScore = Math.max(highestScore, currentStreak);
          document.getElementById('streak').innerText = `Current Streak: ${currentStreak}`;
        }
      }
    });
  } else {
    count += 1;
    drawMan(count);
    if (count == 6) {
      resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
      blocker();
      showDefinitionPopup(chosenWord, chosenDefinition, false);
      currentStreak = 0;
     document.getElementById('streak').innerText = `Current Streak: ${currentStreak}`;
    }
  }
  this.disabled = true;
}

function playRandomSound(sounds, duration) {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const audio = new Audio(sounds[randomIndex]);
  audio.play();
  audio.addEventListener('timeupdate', function() {
    if (audio.currentTime > duration) { // Change duration to the desired duration in seconds
      audio.pause();
    }
  });
}

function showDefinitionPopup(word, definition, isWin) {
  const color = isWin ? "green" : "red";
  const newListItem = document.createElement("li");
  newListItem.innerHTML = `<strong style="color: ${color};">${word}</strong>: ${definition}`;
  const list = document.getElementById("correct-words-list") || createCorrectWordsList();
  list.prepend(newListItem);

  if (isWin) {
    const winSounds = ['yeehaw-4-203840.mp3', '050612_wild-west-1-36194.mp3', 'tada-fanfare-a-6313.mp3', 'correct-6033.mp3']; // Add your win sound file names
    playRandomSound(winSounds, 4); // Adjust the duration here
  } else {
    const loseSounds = ['buzzer-or-wrong-answer-20582.mp3', 'the-only-harmonica-in-the-west-33942.mp3', 'lose-sound3.mp3']; // Add your lose sound file names
    playRandomSound(loseSounds, 7); // Adjust the duration here
  }
}

// Canvas drawing functions
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 5;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY - 5); // Moved up by 5 pixels (less than before)
    context.lineTo(toX, toY - 5); // Moved up by 5 pixels (less than before)
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 25, 10, 0, Math.PI * 2, true); // Moved up by 5 pixels (less than before)
    context.stroke();
  };

  const body = () => {
    drawLine(70, 35, 70, 75); // Adjusted coordinates (less upward shift)
  };

  const leftArm = () => {
    drawLine(70, 45, 50, 65); // Adjusted coordinates (less upward shift)
  };

  const rightArm = () => {
    drawLine(70, 45, 90, 65); // Adjusted coordinates (less upward shift)
  };

  const leftLeg = () => {
    drawLine(70, 75, 50, 105); // Adjusted coordinates (less upward shift)
  };

  const rightLeg = () => {
    drawLine(70, 75, 90, 105); // Adjusted coordinates (less upward shift)
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 125, 130, 125); // Moved up by 5 pixels (less than before)
    drawLine(10, 15, 10, 126); // Adjusted coordinates (less upward shift)
    drawLine(10, 15, 70, 15); // Same as before, less upward shift
    drawLine(70, 15, 70, 15); // Moved up by 5 pixels (less than before)
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Draw the man based on the count
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;

// script.js


// Modify the letterButtonClickHandler function to include a check for the solve command
function letterButtonClickHandler() {
  let inputChar = this.innerText;
  if (inputChar === "SOLVE") { // Assuming "SOLVE" is the command to solve the game
    solveWord();
    return; // Stop further execution
  }

  let charArray = chosenWord.split("");
  let dashes = document.getElementsByClassName("dashes");
  if (charArray.includes(inputChar)) {
    charArray.forEach((char, index) => {
      if (char === inputChar) {
        dashes[index].innerText = char;
        winCount += 1;
        if (winCount == charArray.length) {
          resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
          showDefinitionPopup(chosenWord, chosenDefinition, true);
          currentStreak++;
          highestScore = Math.max(highestScore, currentStreak);
          document.getElementById('streak').innerText = `Current Streak: ${currentStreak}`;
        }
      }
    });
  } else {
    count += 1;
    drawMan(count);
    if (count == 6) {
      resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
      blocker();
      showDefinitionPopup(chosenWord, chosenDefinition, false);
      currentStreak = 0;
      document.getElementById('streak').innerText = `Current Streak: ${currentStreak}`;
    }
  }
  this.disabled = true;
}

// Object to track the state of keys
const keysPressed = {
  Control: false,
  Q: false
};

// Function to solve the game
function solveWord() {
  const dashes = document.getElementsByClassName("dashes"); 
  chosenWord.split("").forEach((char, index) => {
    dashes[index].innerText = char;
  });
  blocker(); // Disable further interactions
  resultText.innerHTML = `<h2 class='win-msg'>Solved!</h2><p>The word was <span>${chosenWord}</span></p>`;
  showDefinitionPopup(chosenWord, chosenDefinition, true);
}

// Event listener for keydown
document.addEventListener('keydown', function(event) {
  if (event.key === 'Control' || event.key === 'q') {
    keysPressed[event.key] = true;
  }

  // Check if the specific combination is pressed
  if (keysPressed['Control'] && keysPressed['q']) {
    event.preventDefault(); // Prevent default actions
    solveWord(); // Solve the game
  }
});

// Event listener for keyup
document.addEventListener('keyup', function(event) {
  if (event.key === 'Control' || event.key === 'q') {
    keysPressed[event.key] = false;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const instructionsButton = document.getElementById("instructions-button");
  const instructionsPopup = document.getElementById("instructions-popup");
  const closePopup = document.getElementById("close-popup");

  instructionsButton.addEventListener("click", function() {
      instructionsPopup.style.display = "block";
  });

  closePopup.addEventListener("click", function() {
      instructionsPopup.style.display = "none";
  });

  window.addEventListener("click", function(event) {
      if (event.target == instructionsPopup) {
          instructionsPopup.style.display = "none";
      }
  });
});
