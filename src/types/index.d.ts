type StringTuple6 = [string, string, string, string, string, string];
type StringTuple5 = [string, string, string, string, string];
declare global {
  type PopularityEntry = number;
  type Popularity = {
    [k: string]: PopularityEntry;
  };
  type QuickSearchEntry = string;
  type QuickSearch = {
    [k: string]: QuickSearchEntry;
  };
  type Conjugation = [
    [
      StringTuple6, // Present
      StringTuple6, // Preterite
      StringTuple6, // Imperfect
      StringTuple6, // Conditional
      StringTuple6 // Future
    ], // Indicative
    [
      StringTuple6, // Present
      StringTuple6, // Imperfect
      StringTuple6, // Imperfect 2
      StringTuple6 // Future (not used)
    ], // Subjunctive
    [
      StringTuple5, // Affirmative
      StringTuple5 // Negative
    ], // Imperative
    string, // Present Participle
    string // Past Participle
  ];
  type VerbsEntry = {
    verb: string;
    definition: string;
    reflexive: boolean;
    conjugation: Conjugation;
  };
  type Verbs = {
    [k: string]: VerbsEntry;
  };
}

export {};
