import { mapRandomUser } from './user';
import { makeDto } from '../../testing/fakes';

describe('mapRandomUser', () => {
  it('повинен взяти id з login.uuid', () => {
    expect(mapRandomUser(makeDto()).id).toBe('uuid-42');
  });

  it('повинен зібрати повне ім’я з імені та прізвища', () => {
    const user = mapRandomUser(makeDto());
    expect(user.fullName).toBe('Lesya Ukrainka');
    expect(user.firstName).toBe('Lesya');
    expect(user.lastName).toBe('Ukrainka');
  });

  it('повинен перенести логін, пароль, email та телефон', () => {
    expect(mapRandomUser(makeDto())).toEqual(
      expect.objectContaining({
        username: 'lesya71',
        password: 'contra',
        email: 'lesya@example.com',
        phone: '(044) 111-2233',
      }),
    );
  });

  it('повинен сформувати адресу у форматі «вулиця номер, місто, область, індекс»', () => {
    expect(mapRandomUser(makeDto()).address).toBe('Saksahanskoho 25, Kyiv, Kyivska, 01033');
  });

  it('повинен використати medium та large фото для аватарів', () => {
    const user = mapRandomUser(makeDto());
    expect(user.avatar).toBe('medium.jpg');
    expect(user.avatarLarge).toBe('large.jpg');
  });

  it('повинен коректно обробити числовий поштовий індекс', () => {
    const dto = makeDto();
    dto.location.postcode = 12345;
    expect(mapRandomUser(dto).address).toMatch(/12345$/);
  });
});
