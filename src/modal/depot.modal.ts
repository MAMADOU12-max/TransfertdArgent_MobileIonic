export class DepotModal{
  // tslint:disable-next-line:max-line-length
  constructor(montant: number, user: number, nomEmetteur: string, prenomEmetteur: string, phoneEmetteur: string, identityNumberEmetteur: string, nomBeneficaire: string, prenomBeneficaire: string, phoneBeneficiaire: number) {
    this.montant = montant;
    this.user = user;
    this.nomEmetteur = nomEmetteur;
    this.prenomEmetteur = prenomEmetteur;
    this.phoneEmetteur = phoneEmetteur;
    this.identityNumberEmetteur = identityNumberEmetteur;
    this.nomBeneficaire = nomBeneficaire;
    this.prenomBeneficaire = prenomBeneficaire;
    this.phoneBeneficiaire = phoneBeneficiaire;
  }

    montant: number;
    user: number;
    nomEmetteur: string;
    prenomEmetteur: string;
    phoneEmetteur: string;
    identityNumberEmetteur: string;
    nomBeneficaire: string;
    prenomBeneficaire: string;
    phoneBeneficiaire: number;
}
