import {BaseEntity} from "./base-entity.model";
import {Engine} from "./engine.model";
import {Model} from "./model.model";

export class Car extends BaseEntity {
  model?: Model;
  engine?: Engine;
  variant?: string;
}
