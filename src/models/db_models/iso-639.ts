// this should mirror the DB table's structure for the stuff we want to load wholesale, or partially.
// there are typically tools to automate code generation. -jyh
class Iso639 {
  iso_639_2: string;
  iso_639_english_name: string;
  iso_639_korean_name: string;
  iso_639_1: string | null;

  constructor(
    iso_639_2: string,
    iso_639_english_name: string,
    iso_639_korean_name: string,
    iso_639_1: string | null = null,
  ) {
    this.iso_639_2 = iso_639_2;
    this.iso_639_english_name = iso_639_english_name;
    this.iso_639_korean_name = iso_639_korean_name;
    this.iso_639_1 = iso_639_1;
  }
}
