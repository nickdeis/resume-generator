export type GrammarResponse = {
  sentences: {
    /**The original sentence**/
    original: string;
    /**The suggested sentence**/
    suggested: string;
    /** The path to this element, with each element in the array being a part of the path. Eg: `[0].a` would be ["0","a"]**/
    path: string[];
    /**Your reasoning for changing the sentence**/
    reason: string;
    /**If a change is needed or not**/
    changeNeeded: boolean;
    /**A number between 0 and 1 that is how much I should change this sentence to your suggestion**/
    suggestionStrength: number;
  }[];
};
