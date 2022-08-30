export class CertData {
  tbsCertificate!: {
    version: string;
    serialNumber: string;
    signature: string;
    issuer: any;
    validity: { notBefore: string; notAfter: string };
    subject: any;
    subjectPublicKeyInfo: { algorithm: string; subjectPublicKey: string };
    error?: string;
  };

  constructor(private asn1) {
    let cert = asn1.sub[0];
    try {
      const version = cert.sub[0].sub[0].content();
      const serialNumber = cert.sub[1].content();
      const signature = cert.sub[2].sub[0].content();
      const issuer = this.getPairs(cert.sub[3].sub, true);
      const validity = {
        notBefore: cert.sub[4].sub[0].content(),
        notAfter: cert.sub[4].sub[1].content(),
      };
      const subject = this.getPairs(cert.sub[5].sub, true);
      const subjectPublicKeyInfo = {
        algorithm: cert.sub[6].sub[0].sub[0].content(),
        subjectPublicKey: cert.sub[6].sub[1].content(),
      };

      //TODO: Optional fields

      this.tbsCertificate = {
        version: version,
        serialNumber: serialNumber,
        signature: signature,
        issuer: issuer,
        validity: validity,
        subject: subject,
        subjectPublicKeyInfo: subjectPublicKeyInfo,
      };
    } catch (e) {
      throw new Error('Failed to parse the certificate');
    }
  }

  getPairs(sets, trimmed: boolean) {
    const x = {};
    let i = 0;
    for (const el of sets) {
      const pair = el.sub[0].sub;
      const key = trimmed
        ? pair[0].content().replace(/^.*\s|\s.*$/gi, '')
        : pair[0].content();
      x[key] = pair[1].content();
    }
    return x;
  }
}
