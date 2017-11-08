import { encode, encodeAll, decode, imapEncode, imapDecode } from './utf7'

describe('utf7 unit tests', function () {
  describe('#imapEncode', function () {
    it('should succeed with basic use cases', function () {
      expect(imapEncode('A\u2262\u0391.')).to.equal('A&ImIDkQ-.')
      expect(imapEncode('\u65E5\u672C\u8A9E')).to.equal('&ZeVnLIqe-')
      expect(imapEncode('Hi Mom -\u263A-!')).to.equal('Hi Mom -&Jjo--!')
      expect(imapEncode('Item 3 is \u00A31.')).to.equal('Item 3 is &AKM-1.')
    })

    it('should encode examples that contain more than one mode shift', function () {
      expect(imapEncode('Jyv\u00E4skyl\u00E4')).to.equal('Jyv&AOQ-skyl&AOQ-')
      expect(imapEncode('\'\u4F60\u597D\' heißt "Hallo"')).to.equal('\'&T2BZfQ-\' hei&AN8-t "Hallo"')
    })

    it('should represented ampersand sign as &-', function () {
      expect(imapEncode('Hot & Spicy & Fruity')).to.equal('Hot &- Spicy &- Fruity')
    })

    it('should encode slashes to commas', function () {
      expect(imapEncode('\uffff\uedca\u9876\u5432\u1fed')).to.equal('&,,,typh2VDIf7Q-')
    })

    it('should encode & sign around non-ASCII chars', function () {
      expect(imapEncode('\u00E4&\u00E4&\u00E4')).to.equal('&AOQ-&-&AOQ-&-&AOQ-')
    })
  })

  describe('#imapDecode', function () {
    it('should decode basic use cases', function () {
      expect(imapDecode('A&ImIDkQ-.')).to.equal('A\u2262\u0391.')
      expect(imapDecode('&ZeVnLIqe-')).to.equal('\u65E5\u672C\u8A9E')
      expect(imapDecode('Hi Mom -&Jjo--!')).to.equal('Hi Mom -\u263A-!')
      expect(imapDecode('Item 3 is &AKM-1.')).to.equal('Item 3 is \u00A31.')
    })

    it('should decode examples that contain more than one mode shift', function () {
      expect(imapDecode('Jyv&AOQ-skyl&AOQ-')).to.equal('Jyv\u00E4skyl\u00E4')
      expect(imapDecode('\'&T2BZfQ-\' hei&AN8-t "Hallo"')).to.equal('\'\u4F60\u597D\' heißt "Hallo"')
    })

    it('should represented ampersand sign as &-', function () {
      expect(imapDecode('Hot &- Spicy &- Fruity')).to.equal('Hot & Spicy & Fruity')
    })

    it('should decode commas to slashes', function () {
      expect(imapDecode('&,,,typh2VDIf7Q-')).to.equal('\uffff\uedca\u9876\u5432\u1fed')
    })

    it('should decode non-ASCII chars', function () {
      expect(imapDecode('&AOQ-&-&AOQ-&-&AOQ-')).to.equal('\u00E4&\u00E4&\u00E4')
    })
  })
})
describe('#encode', function () {
  it('should succeed with basic use cases', function () {
    expect(encodeAll('A\u2262\u0391.')).to.equal('A+ImIDkQ-.')
    expect(encode('A\u2262\u0391.')).to.equal('A+ImIDkQ-.')

    expect(encodeAll('\u65E5\u672C\u8A9E')).to.equal('+ZeVnLIqe-')
    expect(encode('\u65E5\u672C\u8A9E')).to.equal('+ZeVnLIqe-')

    expect(encodeAll('Hi Mom -\u263A-!')).to.equal('Hi Mom -+Jjo--!')
    expect(encode('Hi Mom -\u263A-!', ' !')).to.equal('Hi Mom -+Jjo--!')
    expect(encode('Hi Mom -\u263A-!')).to.equal('Hi+ACA-Mom+ACA--+Jjo--+ACE-')

    expect(encodeAll('Item 3 is \u00A31.')).to.equal('Item 3 is +AKM-1.')
    expect(encode('Item 3 is \u00A31.', ' ')).to.equal('Item 3 is +AKM-1.')
    expect(encode('Item 3 is \u00A31.')).to.equal('Item+ACA-3+ACA-is+ACAAow-1.')
  })

  it('should encode examples that contain more than one mode shift', function () {
    expect(encode('Jyv\u00E4skyl\u00E4')).to.equal('Jyv+AOQ-skyl+AOQ-')
    expect(encodeAll('Jyv\u00E4skyl\u00E4')).to.equal('Jyv+AOQ-skyl+AOQ-')

    expect(encodeAll('\'\u4F60\u597D\' heißt "Hallo"')).to.equal('\'+T2BZfQ-\' hei+AN8-t "Hallo"')
    expect(encode('\'\u4F60\u597D\' heißt "Hallo"', ' "')).to.equal('\'+T2BZfQ-\' hei+AN8-t "Hallo"')
    expect(encode('\'\u4F60\u597D\' heißt "Hallo"')).to.equal('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI-')
  })

  it('should encode the plus sign as +-', function () {
    expect(encodeAll('Hot + Spicy + Fruity')).to.equal('Hot +- Spicy +- Fruity')
    expect(encode('Hot + Spicy + Fruity', ' ')).to.equal('Hot +- Spicy +- Fruity')
    expect(encode('Hot + Spicy + Fruity')).to.equal('Hot+ACAAKwAg-Spicy+ACAAKwAg-Fruity')
  })

  it('should encode slashes in the beginning', function () {
    expect(encodeAll('\uffff\uedca\u9876\u5432\u1fed')).to.equal('+///typh2VDIf7Q-')
  })

  it('should encode non-ASCII chars', function () {
    expect(encodeAll('\u00E4+\u00E4+\u00E4')).to.equal('+AOQAKwDkACsA5A-')
  })
})
describe('#decode', function () {
  it('should succeed with basic use cases', function () {
    expect(decode('A+ImIDkQ-.')).to.equal('A\u2262\u0391.')
    expect(decode('A+ImIDkQ.')).to.equal('A\u2262\u0391.')

    expect(decode('+ZeVnLIqe-')).to.equal('\u65E5\u672C\u8A9E')
    expect(decode('+ZeVnLIqe')).to.equal('\u65E5\u672C\u8A9E')

    expect(decode('Hi Mom -+Jjo--!')).to.equal('Hi Mom -\u263A-!')
    expect(decode('Hi+ACA-Mom+ACA--+Jjo--+ACE-')).to.equal('Hi Mom -\u263A-!')
    expect(decode('Item 3 is +AKM-1.')).to.equal('Item 3 is \u00A31.')
    expect(decode('Item+ACA-3+ACA-is+ACAAow-1.')).to.equal('Item 3 is \u00A31.')
  })

  it('should decode examples that contain more than one mode shift', function () {
    expect(decode('Jyv+AOQ-skyl+AOQ-')).to.equal('Jyv\u00E4skyl\u00E4')
    expect(decode('Jyv+AOQ-skyl+AOQ')).to.equal('Jyv\u00E4skyl\u00E4')
    expect(decode('\'+T2BZfQ-\' hei+AN8-t "Hallo"')).to.equal('\'\u4F60\u597D\' heißt "Hallo"')
    expect(decode('\'+T2BZfQ\' hei+AN8-t "Hallo"')).to.equal('\'\u4F60\u597D\' heißt "Hallo"')
    expect(decode('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI-')).to.equal('\'\u4F60\u597D\' heißt "Hallo"')
    expect(decode('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI')).to.equal('\'\u4F60\u597D\' heißt "Hallo"')
  })

  it('should decode +- to the plus sign', function () {
    expect(decode('Hot +- Spicy +- Fruity')).to.equal('Hot + Spicy + Fruity')
    expect(decode('Hot+ACAAKwAg-Spicy+ACAAKwAg-Fruity')).to.equal('Hot + Spicy + Fruity')
  })

  it('should decode slashes in the beginning', function () {
    expect(decode('+///typh2VDIf7Q-')).to.equal('\uffff\uedca\u9876\u5432\u1fed')
    expect(decode('+///typh2VDIf7Q')).to.equal('\uffff\uedca\u9876\u5432\u1fed')
  })

  it('should decode non-ASCII chars', function () {
    expect(decode('+AOQ-+-+AOQ-+-+AOQ-')).to.equal('\u00E4+\u00E4+\u00E4')
    expect(decode('+AOQ++AOQ+-+AOQ')).to.equal('\u00E4+\u00E4+\u00E4')
    expect(decode('+AOQAKwDkACsA5A-')).to.equal('\u00E4+\u00E4+\u00E4')
    expect(decode('+AOQAKwDkACsA5A')).to.equal('\u00E4+\u00E4+\u00E4')
  })
})
