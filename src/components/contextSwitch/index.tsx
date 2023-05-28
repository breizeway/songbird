import classNames from "classnames";
import { IIconProps, Icon } from "../svg/svg";
import styles from "./context-switch.module.css";

export interface IContextSwitchOption {
  id: string;
  label?: string;
  icon?: IIconProps;
}

interface IContextSwitchProps {
  options: IContextSwitchOption[];
  value: string | number;
  setValue: Function;
  className?: string;
}

export const ContextSwitch = ({
  options,
  value,
  setValue,
  className,
}: IContextSwitchProps): JSX.Element => {
  const onClick = (id: string) => {
    if (options.length === 2 && id === value) {
      const newValue = options.find((option) => option.id !== id)?.id ?? id;
      setValue(newValue);
    } else setValue(id);
  };

  return (
    <div className={classNames(styles.comp, className ?? "")}>
      {options.map(({ id, label, icon }: IContextSwitchOption) => (
        <button
          key={id}
          className={classNames(styles.context, {
            [styles.contextSelected]: value === id,
          })}
          onClick={() => onClick(id)}
        >
          <span className={styles.label}>
            {!!icon ? <Icon {...icon} /> : label ?? ""}
          </span>
        </button>
      ))}
    </div>
  );
};
