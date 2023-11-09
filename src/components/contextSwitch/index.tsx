import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { IIconProps, Icon } from "../svg/svg";
import styles from "./context-switch.module.css";

export interface IContextSwitchOption {
  id: string;
  name?: string;
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

  interface Position {
    top: number;
    bottom: number;
    left: number;
    width: number;
  }

  const [pos, setPos] = useState<Position[]>([]);
  const compRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const comp = compRef.current;
    if (comp) {
      setPos(
        Array.from(comp.children)
          .slice(1)
          .reduce((ac: Position[], c) => {
            const rect = c.getBoundingClientRect();
            const left = (ac.at(-1)?.left ?? 0) + (ac.at(-1)?.width ?? 0);
            const width = rect.width;

            ac.push({ top: 0, bottom: 0, left, width });
            return ac;
          }, [])
      );
    }
  }, []);

  const selectedPos = useMemo(
    () => pos[options.findIndex((o) => o.id === value)],
    [value, options, pos]
  );

  return (
    <div className={classNames(styles.comp, className ?? "")} ref={compRef}>
      <div
        className={classNames(styles.context, styles.contextActive)}
        style={selectedPos}
      />
      {options.map(({ id, name, icon }, idx) => (
        <button
          key={id}
          className={classNames(styles.context, {
            [styles.contextSelected]:
              options.findIndex((o) => o.id === value) === idx,
          })}
          onClick={() => onClick(id)}
        >
          <span className={styles.name}>
            {!!icon ? <Icon {...icon} /> : name ?? ""}
          </span>
        </button>
      ))}
    </div>
  );
};
