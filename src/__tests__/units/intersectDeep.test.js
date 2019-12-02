import { assert } from "chai";
import intersectDeep from "../../core/graphql/intersectDeep";

describe("intersectDeep()", () => {
  it("should work with simple fields and non-collision nested fields", () => {
    const requestBody = {
      firstName: 1,
      profile: {
        services: 1
      }
    };

    const intersectBody = {
      firstName: 1,
      lastName: 1,
      profile: {
        score: 1
      }
    };

    const result = intersectDeep(requestBody, intersectBody);

    assert.isDefined(result.firstName);
    assert.isUndefined(result.lastName);
    assert.isUndefined(result.profile);
  });

  it("should work with allowing the request body nesting", () => {
    const requestBody = {
      profile: {
        services: {
          email: 1
        }
      }
    };

    const intersectBody = {
      profile: {
        services: {}
      }
    };

    const result = intersectDeep(requestBody, intersectBody);

    assert.isObject(result.profile);
    assert.isObject(result.profile.services);
    assert.isNumber(result.profile.services.email);
  });

  it("should work with fields as objects", () => {
    const requestBody = {
      firstName: {}
    };

    const intersectBody = {
      firstName: {}
    };

    const result = intersectDeep(requestBody, intersectBody);

    assert.isDefined(result.firstName);
  });
});
